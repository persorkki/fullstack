import React from 'react'

const Persons = ({ persons, personDeleteHandler }) => {
    return (
        <ul>
        {persons.map(person =>
          <Person
            key={person.name}
            person={person}
            personDeleteHandler={personDeleteHandler} />)}
        </ul>
    )
}

const Person = ({ person, personDeleteHandler}) => {
  return (
    <li>
      {person.name} {person.number} <button onClick={() => personDeleteHandler(person.id, person.name)}>DELETE</button>
    </li>
    )
}

export default Persons