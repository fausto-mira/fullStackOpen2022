import React, { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import Notification from './components/Notification'
import BlogForm from './components/BlogForm'
import LoginForm from './components/LoginForm'
import Togglable from './components/Togglable'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [errorMessage, setErrorMessage] = useState('')
  const [sucessMessage, setSucessMessage] = useState('')
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
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

  const blogFormRef = useRef()

  const handleUsernameChange = (event) => setUsername(event.target.value)
  const handlePasswordChange = (event) => setPassword(event.target.value)

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
    blogFormRef.current.toggleVisibility()
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

  const blogForm = () => {
    return (
      <div>
        {blogs.map(blog =>
          <Blog key={blog.id} blog={blog} validUser={user} message={setSucessMessage} />
        )}
      </div>
    )
  }

  return (
    <div>
      <h2>blogs</h2>
      {errorMessage ? <Notification message={errorMessage} selectedStyle='error' /> : undefined}
      {sucessMessage ? <Notification message={sucessMessage} selectedStyle='sucess' /> : undefined}

      {user === null &&
        <LoginForm
          handleLogin={handleLogin}
          username={username}
          password={password}
          handleUsernameChange={handleUsernameChange}
          handlePasswordChange={handlePasswordChange}
        />}

      {user !== null &&
        <div>
          <p>
            {user.name} logged-in <button type='submit' onClick={handleLogout}>logout</button>
          </p>
          <Togglable buttonLabel='new blog' ref={blogFormRef}>
            <BlogForm createBlog={createBlog} />
          </Togglable>
        </div>}

      {blogForm()}

    </div>
  )
}

export default App
