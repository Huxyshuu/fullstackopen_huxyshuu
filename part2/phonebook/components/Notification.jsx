import React from 'react'
import './styles/Notification.css'

const Notification = ({ message, isError }) => {
  if (message === null) {
    return null
  }

  return (
    <div className={isError ? 'error' : 'notification'}>
      {message}
    </div>
  )
}

export default Notification