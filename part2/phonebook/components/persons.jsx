import React from 'react'

export default function persons({ searchResults, deletePerson }) {
  return (
    <div>
        {
        searchResults.map((person, id) => {
          return <p key={`${person.name}-${id}`}>{person.name} {person.number} <button onClick={() => deletePerson(person.id, person)}>delete</button></p>
        })
        }
    </div>
  )
}
