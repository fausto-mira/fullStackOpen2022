import { useNavigate } from 'react-router-dom'
import { useField } from '../hooks/useField'

const AnecdoteForm = (props) => {
  const content = useField('content')
  const author = useField('author')
  const info = useField('info')

  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log(content)
    props.addNew({
      content: content.value,
      author: author.value,
      info: info.value,
      votes: 0
    })
    navigate('/')
    props.setNotification(`A new anecdote ${content} created!`)
    setTimeout(() => props.setNotification(''), 10000)
  }

  const handleReset = (e) => {
    e.preventDefault()
    content.onReset()
    author.onReset()
    info.onReset()
  }

  return (
    <div>
      <h2>create a new anecdote</h2>
      <form onSubmit={handleSubmit}>
        content
        <input {...content} />
        <br />
        author
        <input {...author} />
        <br />
        url for more info
        <input {...info} />
        <br />
        <button>create</button>
        <button onClick={handleReset}>reset</button>
      </form>
    </div>
  )
}

export default AnecdoteForm
