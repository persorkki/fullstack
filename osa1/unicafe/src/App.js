import React, { useState } from "react"

const Statistics = ({ good, neutral, bad }) => {
  const all = good + bad + neutral
  const avg = (good + (bad * -1)) / all
  const positive = good / (good + neutral + bad) * 100
  
  return (
    <div>
      <DisplayStat name='good' value={good} />
      <DisplayStat name='neutral' value={neutral} />
      <DisplayStat name='bad' value={bad} />
      <DisplayStat name='all' value={all} />
      <DisplayStat name='average' value={avg} />
      <DisplayStat name='positive' value={positive + " %"} />
    </div>
  )
}

const DisplayStat = ({name, value}) => {
  return (
    <div>
      {name} {value}
    </div>
  )
}

const Button = ({clickHandler, text}) => (
    <button onClick={clickHandler}>{text}</button>
  )


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
      <Statistics good={good} neutral={neutral} bad={bad}/>
    </div>
  )
}

export default App
