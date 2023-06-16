import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { createBlog } from '../reducers/blogsReducer'
import Button from './Button'

const BlogForm = () => {
  const [newTitle, setNewTitle] = useState('')
  const [newAuthor, setNewAuthor] = useState('')
  const [newUrl, setNewUrl] = useState('')

  const dispatch = useDispatch()

  const addBlog = event => {
    event.preventDefault()
    const blogObject = {
      title: newTitle,
      author: newAuthor,
      url: newUrl,
      likes: Math.floor(Math.random() * 10)
    }

    dispatch(createBlog(blogObject))
    setNewTitle('')
    setNewAuthor('')
    setNewUrl('')
  }

  return (
    <div>
      <h2 className='text-indigo-500'>create a new</h2>
      <form onSubmit={addBlog}>
        <div>
          title
          <input
            className='bg-gray-700 m-1 rounded-md'
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
            className='bg-gray-700 m-1 rounded-md'
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
            className='bg-gray-700 m-1 rounded-md'
            id='url'
            type='text'
            value={newUrl}
            name='url'
            onChange={({ target }) => setNewUrl(target.value)}
          />
        </div>
        <Button id='create-blog-button' type='submit'>create</Button>
      </form>
    </div>
  )
}

export default BlogForm
