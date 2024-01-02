import { useState } from 'react'

const StatisticLine = ({text, value}) => {
  return (
    <tr>
      <td>{text}</td>
      <td>{value}</td>
    </tr>
  )
}

const Statistics = ({good, neutral, bad}) => {
  if (good + neutral + bad == 0){
    return <p>No feedback given.</p>
  }
  else{
    return (
    <div>
      <table>
        <tbody>
          <StatisticLine text="good" value={good}/>
          <StatisticLine text="neutral" value={neutral}/>
          <StatisticLine text="bad" value={bad}/>
          <StatisticLine text="all" value={good + neutral + bad}/>
          <StatisticLine text="average" value={(good - bad) / (good + neutral + bad)}/>
          <StatisticLine text="positive" value={(good)/(good + neutral + bad) * 100 + "%"}/>
        </tbody>
      </table>
    </div>
    )
  }
}

const Button = ({handleClick, title}) => {
  return (<button onClick={handleClick}>{title}</button>)
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const handleGood = () => {
    setGood(good + 1)
  }
  const handleNeutral = () => {
    setNeutral(neutral + 1)
  }
  const handleBad = () => {
    setBad(bad + 1)
  }

  return (
    <div>
      <h1>Give feedback</h1>
      <div>
        <Button handleClick={handleGood} title={"Good"} />
        <Button handleClick={handleNeutral} title={"Neutral"} />
        <Button handleClick={handleBad} title={"Bad"} />
      </div>
      <h1>Statistics</h1>
      <Statistics bad={bad} neutral={neutral} good={good} />
    </div>
  )
}

export default App