const Notification = ({ message, selectedStyle }) => {
  if (message === null) return null;
  return <div style={selectedStyle}>{message}</div>;
};

export default Notification;
