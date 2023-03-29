import { useState } from 'react'
import blogService from '../services/blogs'
import PropTypes from 'prop-types'

const Blog = ({ blog, validUser, message }) => {
  const [visible, setVisible] = useState(false)
  const [deleted, setDeleted] = useState(false)
  const [likesState, setLikesState] = useState(blog.likes)

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }
  const hideWhenVisible = { ...blogStyle, display: visible ? 'none' : '' }
  const showWhenVisible = { ...blogStyle, display: visible ? '' : 'none' }
  const hideDeletedBlog = { display: deleted ? 'none' : '' }

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  const toggleDeleted = () => {
    setDeleted(!deleted)
  }

  const updateLikes = async () => {
    const updatedBlog = {
      user: blog.user._id,
      likes: likesState + 1,
      title: blog.title,
      author: blog.author,
      url: blog.url
    }
    try {
      const response = await blogService.update(blog.id, updatedBlog)
      console.log(response)
      setLikesState(likesState + 1)
    } catch (exception) { console.log(exception) }
  }

  const deleteBlog = async () => {
    const result = window.confirm(`remove ${blog.title}?`)
    if (result) {
      try {
        await blogService.del(blog.id)
        toggleDeleted()
        message('deleted sucessfully')
      } catch (exception) { console.error(exception.message) }
    }
  }

  return (
    <div style={hideDeletedBlog}>

      <div style={hideWhenVisible}>
        "{blog.title}" by {blog.author}
        <button onClick={toggleVisibility}>view</button>
      </div>

      <div style={showWhenVisible}>
        <div>Title: {blog.title} <button onClick={toggleVisibility}>hide</button></div>
        <div>Author: {blog.author}</div>
        <div>URL: {blog.url}</div>
        <div>likes: {likesState}
          {validUser && <button onClick={updateLikes}>like</button>}
        </div>
        {validUser && <button onClick={deleteBlog}>delete</button>}
      </div>
    </div>
  )
}

Blog.propTypes = {
  blog: PropTypes.object.isRequired
}

export default Blog
