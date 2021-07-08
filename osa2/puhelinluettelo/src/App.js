import React, { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456' },
    { name: 'Ada Lovelace', number: '39-44-5323523' },
    { name: 'Dan Abramov', number: '12-43-234345' },
    { name: 'Mary Poppendieck', number: '39-23-6423122' }
  ])

  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newFilter, setNewFilter] = useState('')
  
  const handleNameChange = (e) => setNewName(e.target.value)
  const handleNumberChange = (e) => setNewNumber(e.target.value)
  const handleFilterChange = (e) => {
    setNewFilter(e.target.value)
  }

  const addNewNumber = (e) =>
  {
    e.preventDefault()
    const personObject = {
      name: newName,
      number: newNumber,
    }
    
    //ilmoitetaan virhe ja palataan jos numero tai nimi ei ole uniikki
    if (persons.filter(x => x.name === newName || x.number === newNumber).length > 0) {
      return window.alert(`${newName} is already added to the phonebook`)
    }
    setPersons(persons.concat(personObject))
    setNewName('')
    setNewNumber('')
  }

  const filtered = persons.filter(x => x.name.toLowerCase().includes(newFilter.toLowerCase()))
  
  return (
    <div>
      <h2>Phonebook</h2>
      <div>filter shown <input value={newFilter} onChange={handleFilterChange} /></div>
      <h2>add a new number</h2>
      <form onSubmit={addNewNumber}>
        
        <div>name: <input value={newName} onChange={handleNameChange} /></div>
        <div>number: <input value={newNumber} onChange={handleNumberChange}/></div>
        <div><button type="submit">add</button></div>
      </form>
      <h2>Numbers</h2>
      <ul>
        { filtered.map(person => <li key={person.name}>{person.name} {person.number}</li>) }
      </ul>
    </div>
  )
}

export default App