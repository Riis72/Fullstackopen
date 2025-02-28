const Notification = ({ message, style }) => {
  if (message === null) {
    return null
  }
  else if (style === 'success') {


    return (
      <div className="success">{message}</div>
    )

  }
  else if (style === 'error') {


    return (
      <div className="error">{message}</div>
    )
  }
}
export default Notification