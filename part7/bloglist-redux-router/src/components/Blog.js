import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

const Blog = ({ blog }) => {
  return (
    <tr className='blog'>
      <td className='bg-gray-700 text-left py-4 px-8'>
        <Link className='hover:italic' to={`/blogs/${blog.id}`}>{blog.title}</Link>
      </td>
      <td className='bg-gray-700 text-left py-4 px-8'>{blog.author}</td>
    </tr>
  )
}

Blog.propTypes = {
  blog: PropTypes.object.isRequired
}

export default Blog
