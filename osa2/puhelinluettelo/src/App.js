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
  //TODO: FIX
  const handleInputChange = (event, setState) => {
    setState(event.target.value)
  }

  const addNewNumber = (event) => {
    event.preventDefault()
    let personObject = {
      name: newName,
      number: newNumber,
      //uniikkeja id:tä jotenkin
      id: newName + "_" + Date.now()
    }
    
    //ilmoitetaan virhe ja palataan jos numero tai nimi ei ole uniikki
    const findPerson = persons.find(x => x.name === newName)
    if (findPerson !== undefined) {
      if (window.confirm(`${newName} is already added to the phonebook, replace the old number with a new one?`)) {
        personService
          .update(findPerson.id, personObject)
          .then(() => {
            let updated = [...persons]
            const index = updated.findIndex(x => x.name === newName)

            //otetaan vanha id talteen koska luomme aina uuden ylempänä
            personObject.id = persons[index].id

            updated[index] = personObject
            //tämä pitäisi hakea serveriltä uudestaan, mutta loputon useEffect looppi estää
            //personsin automaattisen päivittämisen
            //korjaa myöhemmin ehkä
            setPersons(updated)
          })
      }
      return
    }
    personService
      .create(personObject)
      .then(() =>
        setPersons(persons.concat(personObject))
      )
    setNewName('')
    setNewNumber('')
  }
  
  //haetaan uusi lista kerran
  useEffect(() => {
    personService
      .getAll()
      .then(response => {
        setPersons(response)
      })
  }, [])

  useEffect(() => {
    setFiltered(persons.filter(x => x.name.toLowerCase().includes(newFilter.toLowerCase())))
  }, [newFilter, persons])

  const personDeleteHandler = (id, name) => {
    if (window.confirm(`really delete ${name}?`)) {
      personService
        .deletePerson(id)
        //pitäisiköhän tämä hakea serveriltä uudestaan deletoinnin jälkeen?
        .then(setPersons(persons.filter(p => p.id !== id)))
        .catch(error => console.log(error.content))
    }
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter newFilter={newFilter} handleInputChange={handleInputChange} setNewFilter={setNewFilter} />
      <h3>Add a new</h3>
      {/*fix*/}
      <PersonForm
        addNewNumber={addNewNumber}
        newName={newName}
        setNewName={setNewName}
        newNumber={newNumber}
        setNewNumber={setNewNumber}
        handleInputChange={handleInputChange} />
      <h3>Numbers</h3>
      <Persons persons={filtered} personDeleteHandler={personDeleteHandler} />
    </div>
  )
}

export default App