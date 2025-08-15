import { useState, useEffect } from 'react'
import SearchBar from '../components/searchBar.jsx'
import PersonForm from '../components/personForm.jsx'
import Persons from '../components/persons.jsx'
import axios from 'axios'

const App = () => {
  const [persons, setPersons] = useState([])

  const [searchResults, setSearchResults] = useState(persons)

  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')

  const handleNameChange = (e) => {
    setNewName(e.target.value);
  }

  const handleNumberChange = (e) => {
    setNewNumber(e.target.value);
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    const personToSubmit = {
      name: newName,
      number: newNumber,
    } 
    if (persons.some(e => e.name === newName )) {
      alert(`${newName} is already added to phonebook`)
    } else {
      setPersons(persons.concat(personToSubmit));
      setSearchResults(searchResults.concat(personToSubmit));
    }
  }

  useEffect(() => {
    axios
      .get('http://localhost:3001/persons')
      .then(response => {
        setPersons(response.data)
        setSearchResults(searchResults.concat(response.data));
      })
  }, [])

  return (
    <div>
      <h2>Phonebook</h2>
      <SearchBar persons={persons} setSearchResults={setSearchResults}/>
      <h3>add a new</h3>
      <PersonForm handleSubmit={handleSubmit} handleNameChange={handleNameChange} handleNumberChange={handleNumberChange}/>
      <h3>Numbers</h3>
      <Persons searchResults={searchResults}/>
    </div>
  )
}

export default App