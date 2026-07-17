import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  user: null,
  status: 'idle',
  error: null,
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginSuccess: (state, action) => {
      state.user = action.payload
      state.status = 'succeeded'
      state.error = null
    },
    logoutSuccess: (state) => {
      state.user = null
      state.status = 'idle'
      state.error = null
    },
    authFailed: (state, action) => {
      state.status = 'failed'
      state.error = action.payload
    },
  },
})

export const { loginSuccess, logoutSuccess, authFailed } = authSlice.actions
export default authSlice.reducer
