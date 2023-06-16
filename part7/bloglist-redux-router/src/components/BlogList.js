import Blog from './Blog'
import { useSelector } from 'react-redux'

const BlogList = () => {
  const blogs = useSelector(state => state.blogs)
  const user = useSelector(state => state.user)

  return (
    <table className='m-3 w-4/5'>
      <thead>
        <tr>
          <th className='bg-gray-800 text-left py-4 px-8'>Blog</th>
          <th className='bg-gray-800 text-left py-4 px-8'>User</th>
        </tr>
      </thead>
      <tbody>
        {blogs.map(blog =>
          <Blog key={blog.id} blog={blog} user={user} />
        )}
      </tbody>
    </table>
  )
}

export default BlogList
