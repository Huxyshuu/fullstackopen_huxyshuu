import React, { useState } from 'react'
import Country from './Country';

const Content = ({ error, queryResults}) => {
    const [displayCountry, setDisplayCountry] = useState(null);

    const handleShow = (country) => {
        if (country === displayCountry) {
            setDisplayCountry(null);
            return
        }
        setDisplayCountry(country);
    }
    
    if (displayCountry) {
        return <>
        <button onClick={() => handleShow(displayCountry)}>Hide</button>
        <Country country={displayCountry} />
        </>
    }

    if (error) return <p>Too many matches, specify another filter</p>

    if (queryResults && queryResults.length !== 1) {
        return queryResults.map((country, id) => {
            return <p key={id}>{country.name.common} <button onClick={() => handleShow(country)}>Show</button></p>
        })
    }

    if (queryResults && queryResults.length === 1) {
        return <Country country={queryResults[0]} />
    }
}

export default Content