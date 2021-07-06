import React, { useState, useEffect } from 'react'

const Button = ({ clickHandler, text }) => (
  <button onClick={clickHandler}>{text}</button>
)

const Header = ({ text }) => (
  <h1>{text}</h1>
)

const MostVotes = ({votes, anecdote}) => {
  return (
    <div>
      <p>{anecdote}</p>
      <p>has {votes} votes</p>
    </div>
  )
}

const App = () => {

  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when dianosing patients.'
  ]

  const [points, setPoints] = useState(new Array(anecdotes.length).fill(0))
  const [selected, setSelected] = useState(0)
  const [highestIndex, setHighestIndex] = useState(0)

  const randomClick = () => setSelected(Math.floor(Math.random() * anecdotes.length))

  const voteClick = () => {
    const copy = {...points}
    copy[selected] += 1
    setPoints(copy)  
  }
  
  //took longer to figure out than it should have
  useEffect(() => {
    if (points[selected] > points[highestIndex])
    {
      setHighestIndex(selected)
    }
  })

  return (
    <div>
      <Header text="Anecdote of the day"/>
      <p>{anecdotes[selected]}</p>
      <p>has {points[selected]} votes</p>
      <Button clickHandler={voteClick} text="vote" />
      <Button clickHandler={randomClick} text="next anecode" />
      <Header text="Anecdote with most votes" />
      <MostVotes votes={points[highestIndex]} anecdote={anecdotes[highestIndex]}/>
    </div>
  )
}

export default App