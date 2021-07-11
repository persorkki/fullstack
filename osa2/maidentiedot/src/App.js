import React, { useState, useEffect } from 'react'
import axios from 'axios'

const FindCountries = ({find, handleInputChange}) => {
  return (
    <div>
      find countries <input value={find} onChange={handleInputChange}/>
    </div>
  )
}
const FullCountryInfo = ({country}) => {
  return (
    <div>
      <h1>{country.name}</h1>
      <div>capital {country.capital}</div>
      <div>population {country.population}</div>
      <h3>languages</h3>
      <ul>
        {country.languages.map(language => <li key={language.name}>{language.name}</li>)}
      </ul>
      <img alt="flag" width="100" src={country.flag}/>
    </div>
  )
}
//TODO: split into smaller components
const ListCountries = ({ countries, filter, setFilter }) => {
  const filtered = countries.filter(country => country.name.toLowerCase().includes(filter.toLowerCase()))

  if (filtered.length > 10) {
    return (
      <div>Too many matches, specify another filter</div>
    )
  }
  if (filtered.length === 1) {
    const country = filtered[0]
    return (
      <FullCountryInfo country={country}/>
    )
  }
  
  return (
    <div>
      <ul>
        {filtered.map(country =>
          <li key={country.name}>{country.name}
            {/*mitenköhän input valuen saisi päivittymään samalla*/}
            <button onClick={() => setFilter(country.name)}> show </button>
          </li>
        )}
      </ul>
    </div>    
  )
}

const App = () => {
  const [filter, setFilter] = useState('')
  const [countries, setCountries] = useState([])

  useEffect(() => {
    axios
      .get(`https://restcountries.eu/rest/v2/all`)
      .then(response => {
        setCountries(response.data)
      })
  }, [])

  const handleInputChange = (event) => {
    setFilter(event.target.value)
  }
  
  return (
    <div>
      <FindCountries value={filter} handleInputChange={handleInputChange} />
      <ListCountries countries={countries} filter={filter} setFilter={setFilter}/>
    </div>
  )
}

export default App
