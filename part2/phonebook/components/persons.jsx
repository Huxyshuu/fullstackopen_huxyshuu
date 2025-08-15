import React from 'react'

export default function persons({ searchResults }) {
  return (
    <div>
        {
        searchResults.map((person, id) => {
          return <p key={`${person.name}-${id}`}>{person.name} {person.number}</p>
        })
        }
    </div>
  )
}
