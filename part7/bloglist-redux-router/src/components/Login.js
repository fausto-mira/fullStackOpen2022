import React, { useState } from 'react'
import blogService from '../services/blogs'
import loginService from '../services/login'
import LoginForm from './LoginForm'
import { useSelector, useDispatch } from 'react-redux'
import { setNotification } from '../reducers/notificationReducer'
import { setUser } from '../reducers/userReducer'
import { useNavigate } from 'react-router-dom'

const Login = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const user = useSelector(state => state.user)
  const dispatch = useDispatch()
  const navigate = useNavigate()

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
      navigate('/blogs')
    } catch (exception) {
      dispatch(setNotification({ message: 'Wrong username or password', type: 'error', time: 5 }))
    }

    console.log('logged in with', username, password)
  }

  return (
    <div>
      {user === null &&
        <LoginForm
          handleLogin={handleLogin}
          username={username}
          password={password}
          handleUsernameChange={handleUsernameChange}
          handlePasswordChange={handlePasswordChange}
        />}
    </div>
  )
}

export default Login
