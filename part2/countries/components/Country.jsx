import React, { useState, useEffect } from 'react'
import fromApiGods from '../services/apis/apiHandler';

const Country = ({ country }) => {
  const [weather, setWeather] = useState(null);

  useEffect(() => {
    fromApiGods
      .getCountryWeather(country.capitalInfo.latlng[0], country.capitalInfo.latlng[1])
      .then(response => setWeather(response))
      .catch(err => console.error('Error fetching weather data:', err));
  }, [])

  return (
    <div>
        <h1>{country.name.common}</h1>
        <p>Capital {country.capital[0]}</p>
        <p>Area {country.area}</p>
        <h2>Languages</h2>
        <ul>
          {
          country.languages ? Object.values(country.languages).map((language, id) => {
            return <li key={id}>{language}</li>
          }) : null
          }
        </ul>
        <img src={country.flags.png} alt={country.flags.alt} />
        <h2>Weather in {country.capital[0]}</h2>
        {weather ? <div>
          <p>Temperature {weather.temp} Celsius</p>
          <img src={weather.icon} alt="Picture of a weather icon" />
          <p>Wind {weather.wind} m/s</p>
        </div> : <p>Loading temperature...</p>}
      </div>
  )
}

export default Country