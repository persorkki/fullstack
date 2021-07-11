import React from 'react'
import FullCountryInfo from './FullCountryInfo'

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

export default ListCountries