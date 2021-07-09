import React from 'react'

const PersonForm = ({ addNewNumber, newName, setNewName, newNumber, setNewNumber, handleInputChange }) => {
    return (
      <form onSubmit={addNewNumber}>
        <div>name: <input value={newName} onChange={(event) => handleInputChange(event, setNewName)} /></div>
        <div>number: <input value={newNumber} onChange={(event) => handleInputChange(event, setNewNumber)}/></div>
        <div><button type="submit">add</button></div>
      </form>
    )
  }

export default PersonForm