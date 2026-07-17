import { useEffect, useState } from 'react'

function ThemeToggle() {
  const [darkMode, setDarkMode] = useState(() => {
    if (typeof window === 'undefined') return false
    return localStorage.getItem('theme') === 'dark'
  })

  useEffect(() => {
    document.body.classList.toggle('dark', darkMode)
    localStorage.setItem('theme', darkMode ? 'dark' : 'light')
  }, [darkMode])

  return (
    <button type="button" className="theme-toggle" onClick={() => setDarkMode((value) => !value)}>
      {darkMode ? '☀️ Light' : '🌙 Dark'}
    </button>
  )
}

export default ThemeToggle
