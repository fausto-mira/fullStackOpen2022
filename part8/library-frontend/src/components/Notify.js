const Notify = ({ message, setMessage }) => {
  if (!message) {
    return null
  } else {
    setTimeout(() => { setMessage('') }, 5000)
    return (
      <div>{message}</div>
    )
  }
}

export default Notify
