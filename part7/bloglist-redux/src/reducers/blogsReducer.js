import { createSlice } from '@reduxjs/toolkit'
import blogService from '../services/blogs'
import { setNotification } from './notificationReducer'

const initialState = []

const blogSlice = createSlice({
  name: 'blog',
  initialState,
  reducers: {
    set (state, action) {
      return action.payload.sort((a, b) => a.likes - b.likes)
    },
    add (state, action) {
      state.push(action.payload)
    },
    del (state, action) {
      const id = action.payload
      return state.filter(blog => blog.id !== id)
    },
    update (state, action) {
      const updatedBlog = action.payload
      return state.map(blog => blog.id !== updatedBlog.id ? blog : updatedBlog)
    }
  }
})

export const { set, add, del, update } = blogSlice.actions

export const setBlogs = () => {
  return async dispatch => {
    const blogs = await blogService.getAll()
    dispatch(set(blogs))
  }
}

export const createBlog = (newBlog) => {
  return async dispatch => {
    try {
      const result = await blogService.create(newBlog)
      dispatch(add(result))
      dispatch(setNotification({
        message: `a new blog "${newBlog.title}" by ${newBlog.author} added`,
        type: 'success',
        time: 5
      }))
    } catch (exception) {
      dispatch(setNotification({
        message: `cannot add blog. error: ${exception}`,
        type: 'success',
        time: 5
      }))
    }
  }
}

export const incrementLikes = (blog, likes) => {
  return async dispatch => {
    const updatedBlog = {
      user: blog.user,
      likes: likes + 1,
      title: blog.title,
      author: blog.author,
      url: blog.url
    }
    try {
      await blogService.update(blog.id, updatedBlog)
      dispatch(update(blog))
    } catch (exception) { console.log(exception) }
  }
}

export const deleteOneBlog = (id) => {
  return async dispatch => {
    try {
      await blogService.del(id)
      dispatch(del(id))
      dispatch(setNotification({ message: 'deleted successfully', style: 'success', time: 5 }))
    } catch (exception) { console.error(exception.message) }
  }
}

export default blogSlice.reducer
