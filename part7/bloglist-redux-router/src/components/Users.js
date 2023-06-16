import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

const Users = () => {
  const users = useSelector(state => state.users)
  return (
    <div className='m-5'>
      <table>
        <thead>
          <tr>
            <th className='bg-indigo-900 text-left py-4 px-8'>User</th>
            <th className='bg-indigo-900 text-left py-4 px-8'>Blogs</th>
          </tr>
        </thead>
        <tbody>
          {users.map(user => (
            <tr key={user.id}>
              <td className='bg-indigo-800 text-left py-4 px-8'>
                <Link to={`/users/${user.id}`}>{user.name}</Link>
              </td>
              <td className='bg-indigo-800 text-left py-4 px-8'> {user.blogs.length}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default Users
