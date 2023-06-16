import { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useParams, Navigate, useNavigate } from 'react-router-dom'
import { incrementLikes, deleteOneBlog, commentABlog } from '../reducers/blogsReducer'
import Button from './Button'

const IndividualBlog = () => {
  const [comment, setComment] = useState('')
  const { id } = useParams()
  const blogs = useSelector(state => state.blogs)
  const blog = blogs.find(blog => blog.id === id)

  if (!blog) {
    return <Navigate replace to='/blogs' />
  }

  const [likesState, setLikesState] = useState(blog.likes)
  const user = useSelector(state => state.user)

  const dispatch = useDispatch()
  const navigate = useNavigate()

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
      navigate('/blogs')
    }
  }

  const commentBlog = (e) => {
    e.preventDefault()
    dispatch(commentABlog(blog, comment))
    setComment('')
  }

  return (
    <div className='p-3'>
      <h1 className='italic text-xl text-indigo-500 my-5'>{blog.title} by {blog.author}</h1>
      <a className='hover:underline text-indigo-200' href={blog.url} target='_blank' rel='noreferrer'>{blog.url}</a>
      <p>
        likes: {likesState}
        {validUser() && <Button onClick={updateLikes}>like</Button>}
      </p>
      <p className='italic'>added by {blog.user.username}</p>
      {validUser() && <Button onClick={deleteBlog}>delete blog</Button>}

      {blog.comments &&
        <div className='mt-7'>
          <h2>comment</h2>

          <form onSubmit={commentBlog}>
            <input
              className='bg-gray-700 m-3 rounded-md h-10'
              id='comment'
              type='text'
              value={comment}
              name='comment'
              onChange={({ target }) => setComment(target.value)}
            />
            <Button type='submit'>add comment</Button>
          </form>
          <ul className=''>
            {blog.comments.map(comment => {
              return <li key={Math.random() * 100}>&gt; {comment}</li>
            })}
          </ul>
        </div>}
    </div>
  )
}

export default IndividualBlog
