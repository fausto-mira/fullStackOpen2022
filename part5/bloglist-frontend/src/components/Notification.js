import PropTypes from 'prop-types'

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

const Notification = ({ message, selectedStyle }) => {
  if (message === null) return null
  return <div style={styles[selectedStyle]}>{message}</div>
}

Notification.propTypes = {
  selectedStyle: PropTypes.string.isRequired
}

export default Notification
