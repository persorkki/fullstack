import React, { useState } from 'react'

const App = () => {
  const [ persons, setPersons] = useState([
    { name: 'Arto Hellas' }
  ]) 
  const [newName, setNewName] = useState('')
  
  const handleInputChange = (e) =>
  {
    setNewName(e.target.value)
  }

  //[Violation] 'submit' handler took 2702ms?
  const addNewNumber = (e) =>
  {
    e.preventDefault()
    if (persons.filter(x => x.name === newName).length > 0)
      return window.alert(`${newName} is already added to the phonebook`)
  
    const personObject = {
      name: newName
    }

    setPersons(persons.concat(personObject))
    setNewName('')
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addNewNumber}>
        <div>
          name: <input value={newName} onChange={handleInputChange}/>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <ul>
        {persons.map(person => <li key={person.name}>{person.name}</li>)}
      </ul>
    </div>
  )
}

export default App