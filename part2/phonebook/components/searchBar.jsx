import React from 'react'

function SearchBar({ persons, setSearchResults }) {

    const handleSearch = (ev) => {
        const filtered = persons.filter(e => {
        return e.name.toLowerCase().includes(ev.target.value.toLowerCase())
        })
        if (filtered) setSearchResults(filtered)
    }
  return (
    <div>filter shown with <input onChange={handleSearch}/></div>
  )
}

export default SearchBar