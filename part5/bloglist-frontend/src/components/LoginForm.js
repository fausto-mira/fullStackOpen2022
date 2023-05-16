import PropTypes from 'prop-types'

const loginForm = (props) => (
  <form onSubmit={props.handleLogin}>
    <div>
      <input
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
        id='password'
        type='password'
        value={props.password}
        name='Password'
        placeholder='password'
        onChange={props.handlePasswordChange}
      />
    </div>
    <button id='login-button' type='submit'>login</button>
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
