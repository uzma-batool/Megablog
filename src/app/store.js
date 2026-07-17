import { configureStore } from '@reduxjs/toolkit'
import authReducer from '../features/auth/authSlice'
import postsReducer from '../features/posts/postsSlice'
import todosReducer from '../features/todos/todosSlice'

export const store = configureStore({
  reducer: {
    auth: authReducer,
    posts: postsReducer,
    todos: todosReducer,
  },
})
