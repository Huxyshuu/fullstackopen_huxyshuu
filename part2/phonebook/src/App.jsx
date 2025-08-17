import { useState, useEffect } from 'react'
import SearchBar from '../components/searchBar.jsx'
import PersonForm from '../components/personForm.jsx'
import Persons from '../components/persons.jsx'
import personService from '../services/persons/personService.js'
import Notification from '../components/Notification.jsx'
import axios from 'axios'

const App = () => {
  const [persons, setPersons] = useState([])

  const [searchResults, setSearchResults] = useState(persons)

  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')

  const [notificationMessage, setNotificationMessage] = useState(null)
  const [errorNotification, setErrorNotification] = useState(false)

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

          setErrorNotification(false);
          setNotificationMessage(`Updated ${returnedPerson.data.name}'s number`);
          setTimeout(() => {
            setNotificationMessage(null);
          }, 5000);
        })
        .catch(error => {
          if (error.response && error.response.status === 404) {
            setNotificationMessage(`Information of ${person.name} has already been removed from server`);
          } else {
            setNotificationMessage(`Error updating person: ${error.message}`);
          }
          
          setErrorNotification(true);
          setTimeout(() => {
            setNotificationMessage(null);
          }, 5000);
        });
      }
    } else {
      personService
        .create(personToSubmit)
        .then(response => {
          const responsePerson = response.data;
          setPersons(persons.concat(responsePerson));
          setSearchResults(searchResults.concat(responsePerson));

          setErrorNotification(false);
          setNotificationMessage(`Added ${response.data.name}`);
          setTimeout(() => {
            setNotificationMessage(null);
          }, 5000);
        })
        .catch(error => {
          setNotificationMessage(`Error creating person: ${error.message}`);
          setErrorNotification(true);
          setTimeout(() => {
            setNotificationMessage(null);
          }, 5000);
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

        setErrorNotification(false);
        setNotificationMessage(`Deleted ${person.name}`);
        setTimeout(() => {
          setNotificationMessage(null);
        }, 5000);
      })
      .catch(error => {
        if (error.response && error.response.status === 404) {
            setNotificationMessage(`Information of ${person.name} has already been removed from server`);
          } else {
            setNotificationMessage(`Error deleting person: ${error.message}`);
          }
          
          setErrorNotification(true);
          setTimeout(() => {
            setNotificationMessage(null);
          }, 5000);
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
      <Notification message={notificationMessage} isError={errorNotification}/>
      <SearchBar persons={persons} setSearchResults={setSearchResults}/>
      <h3>add a new</h3>
      <PersonForm handleSubmit={handleSubmit} handleNameChange={handleNameChange} handleNumberChange={handleNumberChange}/>
      <h3>Numbers</h3>
      <Persons searchResults={searchResults} deletePerson={deletePerson}/>
    </div>
  )
}

export default App