// import PropTypes from 'prop-types'
import { useNotificationDispatch, useNotificationValue } from '../NotificationContext'

const styles = {
  error: {
    color: 'red',
    background: 'lightgrey',
    fontSize: '20px',
    borderStyle: 'solid',
    borderRadius: '5px',
    padding: '10px',
    marginBottom: '10px'
  },

  success: {
    color: 'green',
    background: 'lightgrey',
    fontSize: '20px',
    borderStyle: 'solid',
    borderRadius: '5px',
    padding: '10px',
    marginBottom: '10px'
  }
}

const Notification = () => {
  const { message, type } = useNotificationValue()
  const dispatch = useNotificationDispatch()
  if (message === null) return null
  setTimeout(() => dispatch({ type: 'RESET' }), 5000)
  return <div style={styles[type]}>{message}</div>
}

// Notification.propTypes = {
//   selectedStyle: PropTypes.string.isRequired
// }

export default Notification
