/* dependency imports */
import React, { useEffect, useState } from 'react'

/* components */
import Persons from './components/Persons'
import PersonForm from './components/PersonForm'
import Filter from './components/Filter'
import Notification from './components/Notification'

/* services */
import personService from './services/person'

const App = () => {

  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newFilter, setNewFilter] = useState('')
  const [filtered, setFiltered] = useState([])
  const [infoText, setInfoText] = useState(null)
  const [isError, setIsError] = useState(false)

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
            infoSetter(`Updated ${newName}`)
            updateList()
          })
          .catch(error => {
            setIsError(true)
            infoSetter(`${newName} does not exist anymore on the server`)
            updateList()
          })
      }
      else {
        infoSetter(`No action was taken`)
      }
      return
    }
    personService
      .create(personObject)
      .then(() =>
        setPersons(persons.concat(personObject))
    )
    infoSetter(`Added ${newName}`)
    setNewName('')
    setNewNumber('')
  }
  
  const updateList = () => {
    personService
      .getAll()
      .then(response => setPersons(response))
      .catch(error => {
        setIsError(true)
        setInfoText(`error fetching the list`)
      })
  }

  //haetaan uusi lista kerran
  useEffect(() => {
    personService
    .getAll()
    .then(response => setPersons(response))
      .catch(error => {
        setIsError(true)
        setInfoText(`error fetching the list`)
    })
  }, [])

  useEffect(() => {
    setFiltered(persons.filter(x => x.name.toLowerCase().includes(newFilter.toLowerCase())))
  }, [newFilter, persons])

  //vähennetään duplikaatiota
  const infoSetter = (message) => {
    setInfoText(message)
    setTimeout(() => {
      setInfoText(null)
      setIsError(false)
    }, 3000)
  }

  const personDeleteHandler = (id, name) => {
    if (window.confirm(`really delete ${name}?`)) {
      personService
        .deletePerson(id)
        //pitäisiköhän tämä oikeastaan hakea serveriltä uudestaan deletoinnin jälkeen?
        //no jostain syystä tämä nyt ainut tapa jolla toimii
        /*.then(setPersons(persons.filter(p => p.id !== id)))*/
        .then(() => updateList())
        .catch(error => { 
          setIsError(true)
          setInfoText(`${name} was already deleted from the server`)
          updateList()
        })
      infoSetter(`Deleted ${name}`)
    }
  }

  return (
    <div>
      <Notification message={infoText} isError={isError} />
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