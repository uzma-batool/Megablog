import { useDispatch, useSelector } from 'react-redux'
import { loginSuccess, logoutSuccess } from '../features/auth/authSlice'

function AuthPanel() {
  const dispatch = useDispatch()
  const { user } = useSelector((state) => state.auth)

  const handleLogin = () => {
    dispatch(loginSuccess({ name: 'Uzma' }))
  }

  return (
    <section className="panel">
      <h2>Auth</h2>
      {user ? (
        <>
          <p>Welcome, {user.name}</p>
          <button type="button" className="secondary" onClick={() => dispatch(logoutSuccess())}>
            Logout
          </button>
        </>
      ) : (
        <button type="button" onClick={handleLogin}>
          Login
        </button>
      )}
    </section>
  )
}

export default AuthPanel
