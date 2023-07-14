import { useState } from 'react'
import { useMutation, useQuery } from '@apollo/client'
import { ALL_AUTHORS, UPDATE_BIRTHYEAR } from '../queries'
import Select from 'react-select'

const Authors = ({ setMessage, user }) => {
  const [year, setYear] = useState('')
  const [selectedOption, setSelectedOption] = useState(null)
  const { data: authors, loading } = useQuery(ALL_AUTHORS)
  const [updateBirthyear] = useMutation(UPDATE_BIRTHYEAR)

  const setBirthyear = (event) => {
    event.preventDefault()
    const born = parseInt(year)
    const name = selectedOption.value
    updateBirthyear({ variables: { name, born } })
    setYear('')
  }

  if (loading) return <div>loading...</div>

  const options = authors.allAuthors.map(({ name }) => ({ value: name, label: name }))

  return (
    <div>
      <h2>authors</h2>
      <table>
        <thead>
          <tr>
            <th>name</th>
            <th>born</th>
            <th>books</th>
          </tr>
        </thead>
        <tbody>
          {authors.allAuthors.map((a) => (
            <tr key={a.name}>
              <td>{a.name}</td>
              <td>{a.born ? a.born : '-'}</td>
              <td>{a.bookCount}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {user &&
        <div>
          <h3>set birthyear</h3>
          <form onSubmit={setBirthyear}>
            <Select
              placeholder='author'
              defaultValue={selectedOption}
              onChange={setSelectedOption}
              options={options}
            />
            <input
              value={year}
              placeholder='born'
              onChange={({ target }) => setYear(target.value)}
            />
            <br />
            <button type='submit'>update author</button>
          </form>
        </div>} {/*eslint-disable-line*/}
    </div>
  )
}

export default Authors
