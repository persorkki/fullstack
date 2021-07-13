/* dependency imports */
import React, { useEffect, useState } from 'react'

/* components */
import Persons from './components/Persons'
import PersonForm from './components/PersonForm'
import Filter from './components/Filter'

/* services */
import personService from './services/person'

const App = () => {

  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newFilter, setNewFilter] = useState('')
  const [filtered, setFiltered] = useState([])
  
  //reusing this was not the code save I was hoping for, FIX?
  const handleInputChange = (event, setState) => {
    setState(event.target.value)
  }

  const addNewNumber = (event) => {
    event.preventDefault()
    const personObject = {
      name: newName,
      number: newNumber,
    }
    
    //ilmoitetaan virhe ja palataan jos numero tai nimi ei ole uniikki
    if (persons.filter(x => x.name === newName || x.number === newNumber).length > 0) {
      return window.alert(`${newName} is already added to the phonebook`)
    }

    personService
      .create(personObject)
      .then(() =>
        setPersons(persons.concat(personObject))
      )
    setNewName('')
    setNewNumber('')
  }

  useEffect(() => {
    personService
      .getAll()
      .then(response => {
        setPersons(response)
      })
  }, [])

  //päivittyy kun persons tai hakufilteri muuttuu
  useEffect(() => {
    setFiltered(persons.filter(x => x.name.toLowerCase().includes(newFilter.toLowerCase())))
  }, [persons, newFilter])

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