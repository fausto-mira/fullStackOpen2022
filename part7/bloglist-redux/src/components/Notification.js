// import PropTypes from 'prop-types'
import { useSelector } from 'react-redux'

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
  const notification = useSelector(state => state.notification)
  if (notification.message === null) return null
  const style = notification.type === 'error' ? styles.error : styles.success
  return <div style={style}>{notification.message}</div>
}

// Notification.propTypes = {
//   selectedStyle: PropTypes.string.isRequired
// }

export default Notification
