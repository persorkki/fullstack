import React, { useState, useEffect } from 'react'
import axios from 'axios'
import FindCountries from './components/FindCountries'
import ListCountries from './components/ListCountries'

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
      <ListCountries countries={countries} filter={filter} setFilter={setFilter} />
      
    </div>
  )
}

export default App
