// const Notification = ({ errorMessage, successMessage }) => {
//   const message = errorMessage||successMessage
//   if (!message) {
//     return null
//   }

//   const notification= {
//     fontStyle: 'italic',
//     background: 'lightgrey',
//     fontSize: '20px',
//     borderStyle: 'solid',
//     borderRadius: '5px',
//     padding: '10px',
//     marginBottom: '10px'
//   }

//   const style ={
//     ...notification,
//     color: errorMessage ? 'red': 'green'
//   }

//   return <div style = {style}>{message}</div>

// }

// export default Notification

import { useSelector } from 'react-redux'
const Notification = () => {
  const { message, type } = useSelector((state) => state.notification)
  if (!message) {
    return null
  }

  return (
    <div className={`notification ${type === 'error' ? 'error' : 'success'}`}>
      {message}
    </div>
  )
}

export default Notification
