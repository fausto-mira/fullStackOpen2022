import React, { useState, useEffect, useRef } from 'react'
import BlogList from './components/BlogList'
import blogService from './services/blogs'
import loginService from './services/login'
import Notification from './components/Notification'
import BlogForm from './components/BlogForm'
import LoginForm from './components/LoginForm'
import Togglable from './components/Togglable'
import { useDispatch, useSelector } from 'react-redux'
import { setNotification } from './reducers/notificationReducer'
import { setBlogs } from './reducers/blogsReducer'
import { setUser, resetUser } from './reducers/userReducer'

const App = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const notification = useSelector(state => state.notification)
  const blogs = useSelector(state => state.blogs)
  const user = useSelector(state => state.user)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(setBlogs())
  }, [setBlogs])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogAppUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      dispatch(setUser(user))
      blogService.setToken(user.token)
    }
  }, [])

  const blogFormRef = useRef()

  const handleUsernameChange = (event) => setUsername(event.target.value)
  const handlePasswordChange = (event) => setPassword(event.target.value)

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({ username, password })
      window.localStorage.setItem(
        'loggedBlogAppUser', JSON.stringify(user)
      )
      blogService.setToken(user.token)
      dispatch(setUser(user))
      setUsername('')
      setPassword('')
      dispatch(setNotification({ message: 'user login succesful', type: 'success', time: 5 }))
    } catch (exception) {
      dispatch(setNotification({ message: 'Wrong username or password', type: 'error', time: 5 }))
    }

    console.log('logged in with', username, password)
  }

  const handleLogout = (event) => {
    event.preventDefault()
    window.localStorage.clear()
    dispatch(resetUser())
    dispatch(setNotification({ message: 'user logout succesful', type: 'success', time: 5 }))
  }

  return (
    <div>
      <h2>blogs</h2>

      {notification.message && <Notification />}

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
            {user.name} logged-in <button id='logout-button' onClick={handleLogout}>logout</button>
          </p>
          <Togglable buttonLabel='new blog' ref={blogFormRef}>
            <BlogForm />
          </Togglable>
        </div>}

      <BlogList blogs={blogs} user={user} />

    </div>
  )
}

export default App
