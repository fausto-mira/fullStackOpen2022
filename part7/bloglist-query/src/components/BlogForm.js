import { useState } from 'react'
import PropTypes from 'prop-types'

const BlogForm = ({ createBlog }) => {
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
            id='title'
            type='text'
            value={newTitle}
            name='title'
            onChange={({ target }) => setNewTitle(target.value)}
          />
        </div>
        <div>
          author
          <input
            id='author'
            type='text'
            value={newAuthor}
            name='author'
            onChange={({ target }) => setNewAuthor(target.value)}
          />
        </div>
        <div>
          url
          <input
            id='url'
            type='text'
            value={newUrl}
            name='url'
            onChange={({ target }) => setNewUrl(target.value)}
          />
        </div>
        <button id='create-blog-button' type='submit'>create</button>
      </form>
    </div>
  )
}

BlogForm.propTypes = {
  createBlog: PropTypes.func.isRequired
}

export default BlogForm
