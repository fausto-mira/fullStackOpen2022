import { useQuery } from '@apollo/client'
import { ALL_BOOKS, USER_FAVORITE_GENRE } from '../graphql/queries'
import { Navigate } from 'react-router-dom'

const Recomemended = () => {
  const { data: books, loading: loadingBooks } = useQuery(ALL_BOOKS)
  const { data: user, loading: loadingUserFavGenre } = useQuery(USER_FAVORITE_GENRE)

  if (loadingBooks || loadingUserFavGenre) return <div>loading...</div>

  if (user === undefined) return <Navigate replace to='/books' />

  const favoriteGenre = user.me.favoriteGenre

  const filteredBooks = books.allBooks.filter(book => book.genres.includes(favoriteGenre))

  return (
    <div>
      <h2>recommended books</h2>
      {filteredBooks.length
        ? <div>
          <h3>books in your favourite genre {favoriteGenre}</h3>
          <table>
            <tbody>
              <tr>
                <th>title</th>
                <th>author</th>
                <th>published</th>
              </tr>
              {filteredBooks.map((a) => (
                <tr key={a.title}>
                  <td>{a.title}</td>
                  <td>{a.author.name}</td>
                  <td>{a.published}</td>
                </tr>
              ))}
            </tbody>
          </table>
          </div> //eslint-disable-line
        : <h3>there is no book with '{favoriteGenre}' genre</h3>}
    </div>
  )
}

export default Recomemended
