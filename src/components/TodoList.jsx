import { useMemo, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { editTodo, removeTodo, toggleTodo } from '../features/todos/todosSlice'

function TodoList() {
  const dispatch = useDispatch()
  const todos = useSelector((state) => state.todos.items)
  const [filter, setFilter] = useState('all')
  const [editingId, setEditingId] = useState(null)
  const [editingText, setEditingText] = useState('')

  const visibleTodos = useMemo(() => {
    if (filter === 'active') {
      return todos.filter((todo) => !todo.completed)
    }

    if (filter === 'completed') {
      return todos.filter((todo) => todo.completed)
    }

    return todos
  }, [filter, todos])

  const startEditing = (todo) => {
    setEditingId(todo.id)
    setEditingText(todo.text)
  }

  const saveEdit = (id) => {
    if (!editingText.trim()) return
    dispatch(editTodo({ id, text: editingText.trim() }))
    setEditingId(null)
  }

  return (
    <section className="panel">
      <h2>Todo List</h2>
      <div className="filter-row">
        <button type="button" className={filter === 'all' ? 'active' : ''} onClick={() => setFilter('all')}>
          All
        </button>
        <button type="button" className={filter === 'active' ? 'active' : ''} onClick={() => setFilter('active')}>
          Active
        </button>
        <button type="button" className={filter === 'completed' ? 'active' : ''} onClick={() => setFilter('completed')}>
          Completed
        </button>
      </div>
      <div className="todo-list">
        {visibleTodos.map((todo) => (
          <div key={todo.id} className={`todo-item ${todo.completed ? 'done' : ''}`}>
            <input
              type="checkbox"
              checked={todo.completed}
              onChange={() => dispatch(toggleTodo(todo.id))}
            />
            {editingId === todo.id ? (
              <input
                value={editingText}
                onChange={(event) => setEditingText(event.target.value)}
                onBlur={() => saveEdit(todo.id)}
              />
            ) : (
              <span onDoubleClick={() => startEditing(todo)}>{todo.text}</span>
            )}
            <div className="todo-actions">
              <button type="button" className="secondary" onClick={() => startEditing(todo)}>
                Edit
              </button>
              <button type="button" className="secondary" onClick={() => dispatch(removeTodo(todo.id))}>
                Remove
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

export default TodoList
