const Button = ({ children, onClick }) => (
  <button onClick={onClick} className='m-1 px-3 py-2 bg-indigo-900 rounded-md hover:scale-105 transition-transform'>{children}</button>
)

export default Button
