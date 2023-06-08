import { useState } from 'react'
import blogService from '../services/blogs'
import { useQueryClient, useMutation } from 'react-query'
import { useNotificationDispatch } from '../NotificationContext'

const Blog = ({ blog, user }) => {
  const [visible, setVisible] = useState(false)
  const [deleted, setDeleted] = useState(false)
  const [likesState, setLikesState] = useState(blog.likes)
  const queryClient = useQueryClient()
  const setNotification = useNotificationDispatch()

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

  const updateBlogMutation = useMutation(blogService.update, {
    onSuccess: (updatedBlog) => {
      const blogs = queryClient.getQueryData('blogs')
      const result = blogs.map(blog => blog.id !== updatedBlog.id ? blog : updatedBlog)
      queryClient.setQueryData('blogs', result)
    }
  })

  const deleteBlogMutation = useMutation(blogService.del, {
    onSuccess: (updatedBlog) => {
      const blogs = queryClient.getQueryData('blogs')
      const result = blogs.filter(blog => blog.id !== updatedBlog.id)
      queryClient.setQueryData('blogs', result)
    }
  })

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

  const updateLikes = async () => {
    updateBlogMutation.mutate({ id: blog.id, newObject: { ...blog, likes: likesState + 1 } })
    setLikesState(likesState + 1)
  }

  const deleteBlog = async () => {
    const result = window.confirm(`remove ${blog.title}?`)
    if (result) {
      deleteBlogMutation.mutate(blog.id)
      toggleDeleted()
      setNotification({ type: 'SET', payload: { message: 'deleted successfully', type: 'success' } })
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

export default Blog
