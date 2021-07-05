import React, { useState } from "react"

const DisplayStat = (props) => {
  return (
    <div>
      {props.name} {props.value}
    </div>
  )
}

const DisplayAvg = ({good, neutral, bad}) => {
  const total = good + neutral + bad
  const score = good + (bad * -1)
  const avg = score/total
  return (
    <div>
      average {avg}
    </div>
  )
}

const Button = (props) => {
  return (
    <button onClick={props.clickHandler}>{props.text}</button>
  )
}

const Header = ({ text }) => (
  <h1>{text}</h1>
)

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const goodClickHandler = () => setGood(good + 1)
  const neutralClickHandler = () => setNeutral(neutral + 1)
  const badClickHandler = () => setBad(bad + 1)
  
  return (
    <div>
      <Header text="give feedback"/>
      <Button clickHandler={goodClickHandler} text="good" />
      <Button clickHandler={neutralClickHandler} text="neutral" />
      <Button clickHandler={badClickHandler} text="bad" />

      <Header text="statistics" />
      
      <DisplayStat name="good" value={good} />
      <DisplayStat name="neutral" value={neutral} />
      <DisplayStat name="bad" value={bad} />
      <DisplayStat name="all" value={good + neutral + bad} />
      <DisplayAvg name="average" good={good} neutral={neutral} bad={bad} />
      <DisplayStat name="positive" value={good / (good + neutral + bad) * 100}/>
    </div>
  )
}

export default App
