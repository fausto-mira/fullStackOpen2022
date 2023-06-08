import React, { useState, useEffect, useRef, useContext } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import Notification from './components/Notification'
import BlogForm from './components/BlogForm'
import LoginForm from './components/LoginForm'
import Togglable from './components/Togglable'
import { useNotificationDispatch } from './NotificationContext'
import UserContext from './UserContext'
import { useMutation, useQuery, useQueryClient } from 'react-query'

const App = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const [user, setUser] = useContext(UserContext)
  const setNotification = useNotificationDispatch()
  const queryClient = useQueryClient()
  const blogFormRef = useRef()
  const query = useQuery('blogs', blogService.getAll)
  const blogs = query.data

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogAppUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser({ type: 'SET', payload: user })
      blogService.setToken(user.token)
    }
  }, [])

  const addBlogMutation = useMutation(blogService.create, {
    onSuccess: (newBlog) => {
      const blogs = queryClient.getQueryData('blogs')
      queryClient.setQueryData('blogs', [...blogs, newBlog])
    }
  })

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
      setUser({ type: 'SET', payload: user })
      setUsername('')
      setPassword('')
      setNotification({ type: 'SET', payload: { message: 'user login successful', type: 'success' } })
      console.log('logged in with', username, password)
    } catch (exception) {
      setNotification({ type: 'SET', payload: { message: 'Wrong username or password', type: 'error' } })
    }
  }

  const handleLogout = (event) => {
    event.preventDefault()
    window.localStorage.clear()
    setUser({ type: 'RESET' })
    setNotification({ type: 'SET', payload: { message: 'user logout successful', type: 'success' } })
  }

  const createBlog = async (newBlog) => {
    blogFormRef.current.toggleVisibility()
    try {
      addBlogMutation.mutateAsync(newBlog)
      setNotification({ type: 'SET', payload: { message: `a new blog "${newBlog.title}" by ${newBlog.author} added`, type: 'success' } })
    } catch (exception) {
      setNotification({ type: 'SET', payload: { message: `cannot add blog. error: ${exception}`, type: 'error' } })
    }
  }

  const blogForm = () => {
    const orderedBlogs = [].concat(blogs)
      .sort((a, b) => a.likes > b.likes ? -1 : 1)
    return (
      <div>
        {orderedBlogs.map(blog =>
          <Blog key={blog.id} blog={blog} user={user} setNotification={setNotification} />
        )}
      </div>
    )
  }

  if (query.isLoading) {
    return <div>loading data...</div>
  }
  if (query.error) {
    return <div>anecdote service not available due to problems in server</div>
  }

  return (
    <div>
      <h2>blogs</h2>
      <Notification />

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
            {user.name} logged-in <button type='submit' id='logout-button' onClick={handleLogout}>logout</button>
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
