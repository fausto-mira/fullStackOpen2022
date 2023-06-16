import Button from './Button'

const Logout = ({ user, handleLogout }) => {
  return (
    <>
      {user.name} logged-in <Button id='logout-button' onClick={handleLogout}>logout</Button>
    </>
  )
}

export default Logout
