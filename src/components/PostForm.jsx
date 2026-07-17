import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { addPost } from '../features/posts/postsSlice'

function PostForm() {
  const dispatch = useDispatch()
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')

  const handleSubmit = (event) => {
    event.preventDefault()
    if (!title.trim() || !content.trim()) return

    dispatch(addPost({ id: Date.now(), title, content }))
    setTitle('')
    setContent('')
  }

  return (
    <form onSubmit={handleSubmit} className="stack">
      <input value={title} onChange={(event) => setTitle(event.target.value)} placeholder="Post title" />
      <textarea value={content} onChange={(event) => setContent(event.target.value)} placeholder="Write your post" />
      <button type="submit">Add post</button>
    </form>
  )
}

export default PostForm
