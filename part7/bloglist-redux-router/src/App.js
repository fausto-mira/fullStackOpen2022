import React, { useEffect } from 'react'
import blogService from './services/blogs'
import Notification from './components/Notification'
import Login from './components/Login'
import Logout from './components/Logout'
import BlogCreation from './components/BlogCreation'
import BlogList from './components/BlogList'
import Users from './components/Users'
import IndividualUser from './components/IndividualUser'
import IndividualBlog from './components/IndividualBlog'
import {
  BrowserRouter as Router,
  Routes, Route, Link, Navigate
} from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { setBlogs } from './reducers/blogsReducer'
import { setUser, resetUser } from './reducers/userReducer'
import { setUsers } from './reducers/usersReducer'
import { setNotification } from './reducers/notificationReducer'

const App = () => {
  const user = useSelector(state => state.user)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(setBlogs())
    dispatch(setUsers())
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogAppUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      dispatch(setUser(user))
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogout = (event) => {
    event.preventDefault()
    window.localStorage.clear()
    dispatch(resetUser())
    dispatch(setNotification({ message: 'user logout succesful', type: 'success', time: 5 }))
  }

  return (
    <div className='bg-gray-900 bg-auto h-screen text-white p-3'>

      <Router>
        <Notification />

        <nav className='from-indigo-600 bg-indigo-300 flex p-6 rounded-xl'>
          <h1 className='font-bold mx-3 mt-2'>blogApp</h1>
          <div className=''>
            <Link to='/' className='mx-3 hover:italic '>Blogs</Link>
            <Link to='/users' className='mx-3 hover:italic '>Users</Link>
            {!user
              ? <Link to='/login' className='mx-3 hover:italic '>Login</Link>
              : <Logout user={user} handleLogout={handleLogout} />}
          </div>
        </nav>

        <Routes>
          <Route path='/blogs/:id' element={<IndividualBlog />} />
          <Route path='/users/:id' element={<IndividualUser />} />
          <Route
            path='/blogs' element={
              <div>
                <BlogCreation />
                <BlogList />
              </div>
            }
          />
          <Route path='/users' element={<Users />} />
          <Route path='/login' element={!user ? <Login /> : <Navigate replace to='/blogs' />} />
          <Route path='/' element={<Navigate replace to='/blogs' />} />
        </Routes>

      </Router>

    </div>
  )
}

export default App
