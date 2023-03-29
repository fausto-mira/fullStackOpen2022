import { useState } from 'react'
import PropTypes from 'prop-types'

const blogForm = ({ createBlog }) => {
  const [newTitle, setNewTitle] = useState('')
  const [newAuthor, setNewAuthor] = useState('')
  const [newUrl, setNewUrl] = useState('')

  const addBlog = event => {
    event.preventDefault()
    const blogObject = {
      title: newTitle,
      author: newAuthor,
      url: newUrl,
      likes: Math.floor(Math.random() * 10)
    }

    createBlog(blogObject)
    setNewTitle('')
    setNewAuthor('')
    setNewUrl('')
  }

  return (
    <div>
      <h2>create a new</h2>
      <form onSubmit={addBlog}>
        <div>
          title
          <input
            type='text'
            value={newTitle}
            name='title'
            onChange={({ target }) => setNewTitle(target.value)}
          />
        </div>
        <div>
          author
          <input
            type='text'
            value={newAuthor}
            name='author'
            onChange={({ target }) => setNewAuthor(target.value)}
          />
        </div>
        <div>
          url
          <input
            type='text'
            value={newUrl}
            name='url'
            onChange={({ target }) => setNewUrl(target.value)}
          />
        </div>
        <button type='submit'>create</button>
      </form>
    </div>
  )
}

blogForm.propTypes = {
  createBlog: PropTypes.func.isRequired
}

export default blogForm
