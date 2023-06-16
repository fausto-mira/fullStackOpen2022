import { useRef } from 'react'
import Togglable from './Togglable'
import BlogForm from './BlogForm'
import { useSelector } from 'react-redux'

const BlogCreation = () => {
  const user = useSelector(state => state.user)
  const blogFormRef = useRef()

  return (
    <div>
      {user !== null &&
        <Togglable buttonLabel='new blog' ref={blogFormRef}>
          <BlogForm />
        </Togglable>}
    </div>
  )
}

export default BlogCreation
