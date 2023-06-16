import PropTypes from 'prop-types'
import Button from './Button'

const loginForm = (props) => (
  <form onSubmit={props.handleLogin} className='mt-5'>
    <div>
      <input
        className='bg-gray-700 m-1 p-3 rounded-md'
        id='username'
        type='text'
        value={props.username}
        name='Username'
        placeholder='username'
        onChange={props.handleUsernameChange}
      />
    </div>
    <div>
      <input
        className='bg-gray-700 m-1 p-3 rounded-md'
        id='password'
        type='password'
        value={props.password}
        name='Password'
        placeholder='password'
        onChange={props.handlePasswordChange}
      />
    </div>
    <Button id='login-button' type='submit'>login</Button>
  </form>
)

loginForm.propTypes = {
  handleLogin: PropTypes.func.isRequired,
  handleUsernameChange: PropTypes.func.isRequired,
  handlePasswordChange: PropTypes.func.isRequired,
  username: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired
}

export default loginForm
