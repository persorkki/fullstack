import React from 'react'


//Header huolehtii kurssin nimen renderöimisestä
const Header = ({course}) => {
  return (
    <div>
      <h1>{course}</h1>
    </div>
  )
}

const Part = ({part, exercise}) => {
  return (
    <>
     <p>{part} {exercise}</p>
    </>
  )
}

//Content osista ja niiden tehtävämääristä 
const Content = ({ parts }) => {
  return (
    <div>
      { parts.map((part) => <Part key={part.id} part={part.name} exercise={part.exercises} />) }
    </div>
  )
}

//Total tehtävien yhteismäärästä.
const Total = ({ parts }) => {
  return (
    <div>
      <strong><p>total of { parts.reduce((sum, part) => part.exercises + sum, 0) } exercises</p></strong>
    </div>
  )
}

const Course = ({ course }) => {
  return (
    <div>
      <Header course={course.name}/>
      <Content parts={course.parts}/>
      <Total parts={course.parts} />
    </div>
  )
}

const App = () => {
  const course = {
    name: 'Half Stack application development',
    id: 1,
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10,
        id: 1
      },
      {
        name: 'Using props to pass data',
        exercises: 7,
        id: 2
      },
      {
        name: 'State of a component',
        exercises: 14,
        id: 3
      },    
      {
        name: 'Redux',
        exercises: 11,
        id: 4
      }
    ]
  }
  return (
    <div>
      <Course course={course} />
    </div>
  )
}

export default App