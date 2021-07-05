import React, { useState } from "react"

const DisplayStat = (props) => {
  return (
    <div>
      {props.name} {props.value}
    </div>
  )
}
const Button = (props) => {
  return (
    <button onClick={props.clickHandler}>{props.text}</button>
  )
}

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const goodClickHandler = () => setGood(good + 1)
  const neutralClickHandler = () => setNeutral(neutral + 1)
  const badClickHandler = () => setBad(bad + 1)
  
  return (
    <div>
      <h1>give feedback</h1>
      <Button clickHandler={goodClickHandler} text="good" />
      <Button clickHandler={neutralClickHandler} text="neutral" />
      <Button clickHandler={badClickHandler} text="bad" />
      <h1>statistics</h1>
      <DisplayStat name="good" value={good} />
      <DisplayStat name="neutral" value={neutral} />
      <DisplayStat name="bad" value={bad}/>
    </div>
  )
}

export default App
