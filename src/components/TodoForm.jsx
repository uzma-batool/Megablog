import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { addTodo } from '../features/todos/todosSlice'

function TodoForm() {
  const dispatch = useDispatch()
  const [text, setText] = useState('')

  const handleSubmit = (event) => {
    event.preventDefault()
    if (!text.trim()) return
    dispatch(addTodo(text.trim()))
    setText('')
  }

  return (
    <form onSubmit={handleSubmit} className="stack">
      <input value={text} onChange={(event) => setText(event.target.value)} placeholder="Add a todo" />
      <button type="submit">Add Todo</button>
    </form>
  )
}

export default TodoForm
