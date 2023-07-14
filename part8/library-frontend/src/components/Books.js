import { useEffect, useState } from 'react'
import { useQuery, useLazyQuery } from '@apollo/client'
import { ALL_BOOKS, BOOKS_BY_GENRE } from '../queries'
import Select from 'react-select'

const Books = (props) => {
  const [genres, setGenres] = useState([])
  const [getBooks] = useLazyQuery(ALL_BOOKS)
  const { data: books, loading, refetch } = useQuery(BOOKS_BY_GENRE)

  useEffect(() => {
    getBooks().then((books) => {
      const options = [{ value: 'all books', label: 'all books' }]
        .concat([...new Set(books.data.allBooks.map(book => book.genres).flat())]
          .map(genre => ({ value: genre, label: genre }))
        )
      setGenres(options)
    })
  }, [setGenres, getBooks])

  if (loading) return <div>loading...</div>

  const change = ({ value }) => {
    refetch({ genre: (value !== 'all books') ? value : '' })
  }

  return (
    <div>
      <h2>books</h2>
      <h3>in genre</h3>
      <Select
        defaultValue={genres[0] || 'all books'}
        onChange={change}
        name='genres'
        options={genres}
      />

      <table style={{ marginTop: '20px', borderStyle: 'solid' }}>
        <tbody>
          <tr>
            <th>title</th>
            <th>author</th>
            <th>published</th>
          </tr>
          {books.booksByGenre.map((a) => (
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default Books
