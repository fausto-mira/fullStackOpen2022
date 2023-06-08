import { useState } from 'react'
import PropTypes from 'prop-types'
import { useDispatch } from 'react-redux'
import { deleteOneBlog, incrementLikes } from '../reducers/blogsReducer'

const Blog = ({ blog, user /*, message */ }) => {
  const [visible, setVisible] = useState(false)
  const [deleted, setDeleted] = useState(false)
  const [likesState, setLikesState] = useState(blog.likes)

  const dispatch = useDispatch()

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }
  const hideWhenVisible = { ...blogStyle, display: visible ? 'none' : '', margin: '0.5em' }
  const showWhenVisible = { ...blogStyle, display: visible ? '' : 'none', margin: '0.5em' }
  const hideDeletedBlog = { display: deleted ? 'none' : '' }

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  const toggleDeleted = () => {
    setDeleted(!deleted)
  }

  const validUser = () => {
    if (user === null) return false
    if (blog.user === null) return false
    return (user.id === blog.user.id || user.username === blog.user.username)
  }

  const updateLikes = () => {
    dispatch(incrementLikes(blog, likesState))
    setLikesState(likesState + 1)
  }

  const deleteBlog = () => {
    const result = window.confirm(`remove ${blog.title}?`)
    if (result) {
      dispatch(deleteOneBlog(blog.id))
      toggleDeleted()
    }
  }

  return (
    <div style={hideDeletedBlog} className='blog'>

      <div style={hideWhenVisible}>
        "{blog.title}" by {blog.author}
        <button id='view-button' onClick={toggleVisibility}>view</button>
      </div>

      <div style={showWhenVisible}>
        <div>Title: {blog.title} <button onClick={toggleVisibility}>hide</button></div>
        <div>Author: {blog.author}</div>
        <div>URL: {blog.url}</div>
        <div>likes: {likesState}
          {user && <button id='like-button' onClick={updateLikes}>like</button>}
        </div>
        {validUser() && <button id='delete-button' onClick={deleteBlog}>delete</button>}
      </div>
    </div>
  )
}

Blog.propTypes = {
  blog: PropTypes.object.isRequired
}

export default Blog
