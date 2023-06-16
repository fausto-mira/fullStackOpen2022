import { useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'

const IndividualUser = () => {
  const { id } = useParams()
  const users = useSelector(state => state.users)

  const user = users.find(user => user.id === id)

  if (!user) {
    return null
  }

  return (
    <div>
      <h3>{user.name}</h3>
      <h4>added blogs</h4>
      <ul>
        {user.blogs.map(blog =>
          <li key={blog.id}>{blog.title}</li>)}
      </ul>
    </div>
  )
}

export default IndividualUser
