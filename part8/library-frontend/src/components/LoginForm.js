import { useEffect, useState } from 'react'
import { useMutation } from '@apollo/client'
import { LOGIN } from '../graphql/mutation'

const LoginForm = ({ setMessage, setToken }) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const [login, result] = useMutation(LOGIN, {
    onError: (error) => {
      setMessage(error.graphQLErrors[0].message)
    }
  })

  useEffect(() => {
    if (result.data) {
      setMessage(`Welcome back ${username}`)
      const token = result.data.login.value
      setToken(token)
      localStorage.setItem('library-user-token', token) //eslint-disable-line
    }
  }, [result.data]) //eslint-disable-line

  const submit = async (event) => {
    event.preventDefault()
    login({ variables: { username, password } })
  }

  return (
    <div>
      <h2>login</h2>
      <form onSubmit={submit}>
        <div>
          <div>username</div>
          <input
            value={username}
            label='username'
            type='text'
            onChange={e => setUsername(e.target.value)}
          />
        </div>
        <div>
          <div>password</div>
          <input
            value={password}
            label='password'
            type='password'
            onChange={e => setPassword(e.target.value)}
          />
        </div>
        <p />
        <button type='submit'>login</button>
      </form>
    </div>
  )
}

export default LoginForm
