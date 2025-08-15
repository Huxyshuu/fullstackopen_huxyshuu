import { useState } from 'react'
import SearchBar from '../components/searchBar.jsx'
import PersonForm from '../components/personForm.jsx'
import Persons from '../components/persons.jsx'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ])

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