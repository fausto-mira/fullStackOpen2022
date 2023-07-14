import { useState } from 'react'
import Authors from './components/Authors'
import Books from './components/Books'
import Recomemended from './components/Recommended'
import NewBook from './components/NewBook'
import Menu from './components/Menu'
import Notify from './components/Notify'
import LoginForm from './components/LoginForm'
import { Routes, Route, Navigate } from 'react-router-dom'
import { useApolloClient } from '@apollo/client'

const App = () => {
  const [token, setToken] = useState(null)
  const [message, setMessage] = useState('')
  const client = useApolloClient()

  const logout = () => {
    setMessage('logout succesfully')
    setToken(null)
    localStorage.clear() //eslint-disable-line
    client.resetStore()
  }

  return (
    <div>
      <Notify message={message} setMessage={setMessage} />
      <Menu loggedUser={token} logout={logout} />

      <Routes>
        <Route path='/books' element={<Books />} />
        <Route path='/authors' element={<Authors setMessage={setMessage} user={token} />} />
        <Route
          path='/login'
          element={
            !token
              ? <LoginForm setMessage={setMessage} setToken={setToken} />
              : <Navigate replace to='/books' />
          }
        />
        <Route path='/recommended' element={<Recomemended />} />
        <Route path='/add-book' element={<NewBook setMessage={setMessage} />} />
        <Route path='/' element={<Navigate replace to='/books' />} />

      </Routes>
    </div>
  )
}

export default App
