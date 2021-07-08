import React, { useState } from 'react'

const App = () => {
  const [ persons, setPersons] = useState([
    {
      name: 'Arto Hellas',
      number: '040-1231244',
    }
  ]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  
  const handleNameChange = (e) => setNewName(e.target.value)
  const handleNumberChange = (e) => setNewNumber(e.target.value)

  //[Violation] 'submit' handler took 2702ms?
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

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addNewNumber}>
        
        <div>name: <input value={newName} onChange={handleNameChange} /></div>
        <div>number: <input value={newNumber} onChange={handleNumberChange}/></div>
        <div><button type="submit">add</button></div>
      </form>
      <h2>Numbers</h2>
      <ul>
        {persons.map(person => <li key={person.name}>{person.name} {person.number}</li>)}
      </ul>
    </div>
  )
}

export default App