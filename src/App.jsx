import './App.css'
import AuthPanel from './components/AuthPanel'
import Footer from './components/Footer'
import Navbar from './components/Navbar'
import PostForm from './components/PostForm'
import PostList from './components/PostList'
import StatsCard from './components/StatsCard'
import ThemeToggle from './components/ThemeToggle'
import TodoForm from './components/TodoForm'
import TodoList from './components/TodoList'

function App() {
  return (
    <div className="app-shell">
      <Navbar />
      <ThemeToggle />

      <header className="hero-card">
        <p className="eyebrow">Redux Toolkit Project Structure</p>
        <h1>Big project Redux setup</h1>
        <p className="intro">
          This version demonstrates a scalable Redux Toolkit structure with separate slices for auth and posts.
        </p>
      </header>

      <section className="stats-grid">
        <StatsCard label="Active users" value="12" />
        <StatsCard label="Posts" value="2" />
        <StatsCard label="Status" value="Live" />
      </section>

      <div className="panel-grid">
        <AuthPanel />
        <PostForm />
      </div>

      <div className="panel-grid">
        <TodoForm />
        <TodoList />
      </div>

      <PostList />
      <Footer />
    </div>
  )
}

export default App
