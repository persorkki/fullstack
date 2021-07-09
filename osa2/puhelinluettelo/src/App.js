import React, { useState } from 'react'
import Persons from './components/Persons'
import PersonForm from './components/PersonForm'
import Filter from './components/Filter'

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
  
  //reusing this was not the code save I was hoping for
  const handleInputChange = (e, set) => {
    set(e.target.value)
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
      <Filter newFilter={newFilter} handleInputChange={handleInputChange} setNewFilter={setNewFilter} />

      <h3>Add a new</h3>
      {/*probably a horrible way to do this,sorry*/}
      <PersonForm
        addNewNumber={addNewNumber}
        newName={newName}
        setNewName={setNewName}
        newNumber={newNumber}
        setNewNumber={setNewNumber}
        handleInputChange={handleInputChange} />
      
      <h3>Numbers</h3>
      <Persons persons={filtered} />
      
    </div>
  )
}

export default App