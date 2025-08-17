import { useState, useEffect } from 'react'
import SearchBar from '../components/searchBar.jsx'
import PersonForm from '../components/personForm.jsx'
import Persons from '../components/persons.jsx'
import personService from '../services/persons/personService.js'
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
    if (persons.some(p => p.name === newName )) {
      if (window.confirm(`${newName} is already added to to phonebook, replace the old number with a new one?`)) {
        const person = persons.find(p => p.name === newName);
        const changedPerson = { ...person, number: newNumber}

        personService
        .update(person.id, changedPerson)
        .then(returnedPerson => {
          console.log(returnedPerson)
          setPersons(persons.map(p => p.id === person.id ? returnedPerson.data : p));
          setSearchResults(searchResults.map(p => p.id === person.id ? returnedPerson .data: p));
        })
        .catch(error => {
          console.error('Error updating person:', error);
        });
      }
    } else {
      personService
        .create(personToSubmit)
        .then(response => {
          const responsePerson = response.data;
          setPersons(persons.concat(responsePerson));
          setSearchResults(searchResults.concat(responsePerson));
        })
        .catch(error => {
          console.error('Error creating person:', error);
        });
    }
  }

  const deletePerson = (id, person) => {
    if (window.confirm(`Delete ${person.name}?`)) {
      personService
      .deletePerson(id)
      .then(() => {
        setPersons(persons.filter(p => p.id !== id));
        setSearchResults(searchResults.filter(p => p.id !== id));
      })
      .catch(error => {
        console.error('Error deleting person:', error);
      });
    }
  }

  useEffect(() => {
    personService
      .getAll()
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
      <Persons searchResults={searchResults} deletePerson={deletePerson}/>
    </div>
  )
}

export default App