import React from 'react';
import { useState } from 'react';
import axios from 'axios'
import Content from '../components/Content';
import fromApiGods from '../services/apis/apiHandler';

function App() {

  const [queryResults, setQueryResults] = useState(null);
  const [error, setError] = useState(false)

  const queryCountry = (event) => {
    const searchedCountry = event.target.value
    if (searchedCountry.length < 1) {
      setError(false)
      setQueryResults(null)
      return
    }
    fromApiGods
      .getAllCountries()
      .then(response => {
        const filtered = response.data.filter(country => country.name.common.toLowerCase().includes(searchedCountry.toLowerCase()))
        if (filtered.length > 10) {
          setError(true)
          return
        }
        setError(false)
        setQueryResults(filtered)
      })
      .catch(err => {
        console.log(err)
      })
  }

  return (
    <>
      <p>find countries <input type="text" onChange={queryCountry}/></p>
      <Content error={error} queryResults={queryResults}/>
    </>
  )
}

export default App
