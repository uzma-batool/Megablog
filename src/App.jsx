import { useEffect, useState } from 'react'
import { account, databases, databaseId, collectionId, ID, isConfigured } from './appwrite'
import './App.css'

function App() {
  const [loading, setLoading] = useState(true)
  const [session, setSession] = useState(null)
  const [posts, setPosts] = useState([])
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [status, setStatus] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const fetchPosts = async () => {
    if (!isConfigured) {
      setStatus('Set your Appwrite environment variables first.')
      setLoading(false)
      return
    }

    try {
      const result = await databases.listDocuments(databaseId, collectionId)
      setPosts(result.documents || [])
    } catch (error) {
      setStatus(error.message || 'Unable to load posts')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    const loadSession = async () => {
      try {
        const current = await account.get()
        setSession(current)
      } catch {
        setSession(null)
      } finally {
        fetchPosts()
      }
    }

    if (isConfigured) {
      loadSession()
    } else {
      setLoading(false)
    }
  }, [])

  const handleSignup = async (event) => {
    event.preventDefault()
    setStatus('')

    try {
      await account.create(ID.unique(), email, password)
      await account.createEmailPasswordSession(email, password)
      const current = await account.get()
      setSession(current)
      setStatus('Account created. You can now create posts.')
    } catch (error) {
      setStatus(error.message || 'Signup failed')
    }
  }

  const handleLogin = async (event) => {
    event.preventDefault()
    setStatus('')

    try {
      await account.createEmailPasswordSession(email, password)
      const current = await account.get()
      setSession(current)
      setStatus('Signed in successfully.')
    } catch (error) {
      setStatus(error.message || 'Login failed')
    }
  }

  const handleLogout = async () => {
    try {
      await account.deleteSession('current')
      setSession(null)
      setStatus('Signed out.')
    } catch (error) {
      setStatus(error.message || 'Logout failed')
    }
  }

  const handleCreatePost = async (event) => {
    event.preventDefault()
    if (!title.trim() || !content.trim()) {
      setStatus('Please add both a title and content.')
      return
    }

    try {
      await databases.createDocument(databaseId, collectionId, ID.unique(), {
        title: title.trim(),
        content: content.trim(),
        author: session?.$id || 'guest',
      })
      setTitle('')
      setContent('')
      setStatus('Post created successfully.')
      fetchPosts()
    } catch (error) {
      setStatus(error.message || 'Unable to create post')
    }
  }

  return (
    <div className="app-shell">
      <header className="hero-card">
        <div>
          <p className="eyebrow">MegaBlog + Appwrite</p>
          <h1>Create and publish posts with Appwrite</h1>
          <p className="intro">
            This starter app connects to Appwrite for auth and document storage.
          </p>
        </div>
      </header>

      {status ? <div className="status">{status}</div> : null}

      {!isConfigured ? (
        <div className="panel">
          <h2>Set up your Appwrite project</h2>
          <p>
            Add VITE_APPWRITE_ENDPOINT, VITE_APPWRITE_PROJECT_ID, VITE_APPWRITE_DATABASE_ID,
            and VITE_APPWRITE_COLLECTION_ID to your environment variables.
          </p>
        </div>
      ) : null}

      <div className="panel-grid">
        <section className="panel">
          <h2>{session ? 'Create a post' : 'Sign in or create an account'}</h2>
          {session ? (
            <form onSubmit={handleCreatePost} className="stack">
              <input
                value={title}
                onChange={(event) => setTitle(event.target.value)}
                placeholder="Post title"
              />
              <textarea
                value={content}
                onChange={(event) => setContent(event.target.value)}
                placeholder="Share your thoughts..."
              />
              <button type="submit">Publish post</button>
              <button type="button" className="secondary" onClick={handleLogout}>
                Sign out
              </button>
            </form>
          ) : (
            <form className="stack">
              <input
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                placeholder="Email"
                type="email"
              />
              <input
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                placeholder="Password"
                type="password"
              />
              <div className="button-row">
                <button type="button" onClick={handleLogin}>
                  Login
                </button>
                <button type="button" className="secondary" onClick={handleSignup}>
                  Signup
                </button>
              </div>
            </form>
          )}
        </section>

        <section className="panel">
          <h2>Recent posts</h2>
          {loading ? <p>Loading posts...</p> : null}
          {!loading && posts.length === 0 ? <p>No posts yet. Create the first one.</p> : null}
          <div className="post-list">
            {posts.map((post) => (
              <article key={post.$id} className="post-card">
                <h3>{post.title}</h3>
                <p>{post.content}</p>
              </article>
            ))}
          </div>
        </section>
      </div>
    </div>
  )
}

export default App
