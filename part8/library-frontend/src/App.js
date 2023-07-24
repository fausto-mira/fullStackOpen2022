import { useState } from 'react'
import Authors from './components/Authors'
import Books from './components/Books'
import Recomemended from './components/Recommended'
import NewBook from './components/NewBook'
import Menu from './components/Menu'
import Notify from './components/Notify'
import LoginForm from './components/LoginForm'
import { Routes, Route, Navigate } from 'react-router-dom'
import { useApolloClient, useSubscription } from '@apollo/client'
import { ALL_BOOKS, BOOKS_BY_GENRE } from './graphql/queries'
import { BOOK_ADDED } from './graphql/subscription'
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

  const updateCacheWith = (addedBook) => {
    const includeIn = (set, object) => set.map(book => book.id).includes(object.id)

    const { allBooks: booksInStore } = client.readQuery({ query: ALL_BOOKS })
    const { booksByGenre: booksByGenreInStore } = client.readQuery({ query: BOOKS_BY_GENRE })

    if (!includeIn(booksInStore, addedBook)) {
      client.writeQuery({
        query: ALL_BOOKS,
        data: { allBooks: booksInStore.concat(addedBook) }
      })
    }

    if (!includeIn(booksByGenreInStore, addedBook)) {
      client.writeQuery({
        query: BOOKS_BY_GENRE,
        data: { booksByGenre: booksByGenreInStore.concat(addedBook) }
      })
    }
  }

  useSubscription(BOOK_ADDED, {
    onData: ({ data }) => {
      const addedBook = data.data.addedBook
      if (!message)window.alert(`Book "${addedBook.title} added!"`)
      updateCacheWith(addedBook)
    }
  })

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
