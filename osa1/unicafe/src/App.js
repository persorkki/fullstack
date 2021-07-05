import React, { useState } from "react"

const Statistics = ({ good, neutral, bad }) => {

  const all = good + bad + neutral
  const avg = (good + (bad * -1)) / all
  const positive = good / (good + neutral + bad) * 100
  
  if (all > 0) {
    return (
      <div>
        <StatisticLine name='good' value={good} />
        <StatisticLine name='neutral' value={neutral} />
        <StatisticLine name='bad' value={bad} />
        <StatisticLine name='all' value={all} />
        <StatisticLine name='average' value={avg} />
        <StatisticLine name='positive' value={positive + " %"} />
      </div>
    )
  }

  return (
    <div>
      no feedback given
    </div>
  )
}

const StatisticLine = ({ name, value }) => (
      <div>
        {name} {value}
      </div>
)
  
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
