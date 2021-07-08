import React from 'react'

//Total tehtävien yhteismäärästä.
const Total = ({ parts }) => {
  return (
    <div>
      <strong><p>total of {parts.reduce((sum, part) => part.exercises + sum, 0)} exercises</p></strong>
    </div>
  )
}

//Content osista ja niiden tehtävämääristä 
const Content = ({ parts }) => {
  return (
    <div>
      {parts.map((part) => <Part key={part.id} part={part.name} exercise={part.exercises} />)}
    </div>
  )
}


const Part = ({ part, exercise }) => {
  return (
    <>
      <p>{part} {exercise}</p>
    </>
  )
}

//Header huolehtii kurssin nimen renderöimisestä
const Header = ({ course }) => {
  return (
    <div>
      <h1>{course}</h1>
    </div>
  )
}

const Course = ({ course }) => {
  return (
    <div>
      <Header course={course.name} />
      <Content parts={course.parts} />
      <Total parts={course.parts} />
    </div>
  )
}

export default Course