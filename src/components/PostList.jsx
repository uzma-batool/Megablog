import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchPosts } from '../features/posts/postsSlice'

function PostList() {
  const dispatch = useDispatch()
  const { items, status, error } = useSelector((state) => state.posts)

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchPosts())
    }
  }, [dispatch, status])

  return (
    <section className="panel">
      <h2>Posts</h2>
      {status === 'loading' && <p>Loading posts...</p>}
      {error && <p>{error}</p>}
      <div className="post-list">
        {items.map((post) => (
          <article key={post.id} className="post-card">
            <h3>{post.title}</h3>
            <p>{post.content}</p>
          </article>
        ))}
      </div>
    </section>
  )
}

export default PostList
