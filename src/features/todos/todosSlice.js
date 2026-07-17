import { createSlice } from '@reduxjs/toolkit'

const loadTodos = () => {
  try {
    const saved = localStorage.getItem('redux-todos')
    return saved
      ? JSON.parse(saved)
      : [
          { id: 1, text: 'Learn Redux Toolkit', completed: true },
          { id: 2, text: 'Build a scalable app', completed: false },
        ]
  } catch {
    return [
      { id: 1, text: 'Learn Redux Toolkit', completed: true },
      { id: 2, text: 'Build a scalable app', completed: false },
    ]
  }
}

const initialState = {
  items: loadTodos(),
}

const todosSlice = createSlice({
  name: 'todos',
  initialState,
  reducers: {
    addTodo: (state, action) => {
      state.items.push({ id: Date.now(), text: action.payload, completed: false })
    },
    toggleTodo: (state, action) => {
      const todo = state.items.find((item) => item.id === action.payload)
      if (todo) {
        todo.completed = !todo.completed
      }
    },
    removeTodo: (state, action) => {
      state.items = state.items.filter((item) => item.id !== action.payload)
    },
    editTodo: (state, action) => {
      const todo = state.items.find((item) => item.id === action.payload.id)
      if (todo) {
        todo.text = action.payload.text
      }
    },
  },
})

export const { addTodo, toggleTodo, removeTodo, editTodo } = todosSlice.actions
export default todosSlice.reducer
