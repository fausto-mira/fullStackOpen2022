import { Link } from 'react-router-dom'

const Menu = ({ loggedUser, logout }) => {
  return (
    <div>
      <Link to='/books'><button>books</button></Link>
      <Link to='/authors'><button>authors</button></Link>
      {loggedUser && <Link to='/recommended'><button>recommended</button></Link>}
      {!loggedUser && <Link to='/login'><button>login</button></Link>}
      {loggedUser && <Link to='/add-book'><button>add book</button></Link>}
      {loggedUser && <button onClick={logout}>logout</button>}
    </div>
  )
}

export default Menu
