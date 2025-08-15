import React from 'react'

export default function personForm({ handleSubmit, handleNameChange, handleNumberChange }) {
  return (
    <form onSubmit={handleSubmit}>
        <div>
          name: <input onChange={handleNameChange}/>
        </div>
        <div>
          number: <input onChange={handleNumberChange}/>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
  )
}
