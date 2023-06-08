import Blog from './Blog'

const blogForm = ({ blogs, user }) => {
  return (
    <div>
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} user={user} />
      )}
    </div>
  )
}

export default blogForm
