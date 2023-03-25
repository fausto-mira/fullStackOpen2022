import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import Notification from './components/Notification'
import BlogForm from './components/BlogForm'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [errorMessage, setErrorMessage] = useState('')
  const [sucessMessage, setSucessMessage] = useState('')
  const [username, setUsername] = useState([])
  const [password, setPassword] = useState([])
  const [user, setUser] = useState(null)

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs(blogs)
    )
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogAppUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const user = await loginService.login({
        username, password
      })

      window.localStorage.setItem(
        'loggedBlogAppUser', JSON.stringify(user)
      )

      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
      setSucessMessage('user login sucessful')
      setTimeout(() => setSucessMessage(''), 5000)
    } catch (exception) {
      setErrorMessage('Wrong username or password')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }

    console.log('logged in with', username, password)
  }

  const handleLogout = (event) => {
    event.preventDefault()
    window.localStorage.clear()
    setUser(null)
    setSucessMessage('user logout sucessful')
    setTimeout(() => setSucessMessage(''), 5000)
  }

  const createBlog = async (newBlog) => {
    try {
      const result = await blogService.create(newBlog)
      setSucessMessage(`a new blog "${newBlog.title}" by ${newBlog.author} added`)
      setBlogs(blogs.concat(result))
      setTimeout(() => setSucessMessage(''), 5000)
    } catch (exception) {
      setErrorMessage(`cannot add blog. error: ${exception}`)
      setTimeout(() => setErrorMessage(''), 5000)
    }
  }

  const loginForm = () => (
    <form onSubmit={handleLogin}>
      <div>
        username
        <input
          type='text'
          value={username}
          name='Username'
          onChange={({ target }) => setUsername(target.value)}
        />
      </div>
      <div>
        password
        <input
          type='password'
          value={password}
          name='Password'
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <button type='submit'>login</button>
    </form>
  )

  const blogForm = () => (
    <div>

      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}

    </div>
  )

  return (
    <div>
      <h2>blogs</h2>
      {errorMessage ? <Notification message={errorMessage} selectedStyle='error' /> : undefined}
      {sucessMessage ? <Notification message={sucessMessage} selectedStyle='sucess' /> : undefined}

      {user === null && loginForm()}
      {user !== null &&
        <div>
          <p>
            {user.name} logged-in <button type='submit' onClick={handleLogout}>logout</button>
          </p>
          {blogForm()}
          <h2>create new</h2>
          <BlogForm createBlog={createBlog} />
        </div>}

    </div>
  )
}

export default App
