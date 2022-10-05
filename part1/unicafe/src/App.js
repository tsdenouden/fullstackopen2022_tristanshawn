import { useState } from 'react'

const CafeButton = ({text, onClick}) => <button onClick={onClick}>{text}</button>

const StatisticLine = ({text, value}) => {
  return (
    <tr>
      <td>{text}</td>
      <td>{value}</td>
    </tr>
  )
}

const Statistics = ({good, neutral, bad}) => {
  const all = good + neutral + bad
  if (!all) return (<p>No feedback given.</p>)
  return (
    <div>
      <table>
        <tbody>
          <StatisticLine text="good" value={good}/>
          <StatisticLine text="neutral" value={neutral}/>
          <StatisticLine text="bad" value={bad}/>
          <StatisticLine text="all" value={all}/>
          <StatisticLine text="average" value={all/3}/>
          <StatisticLine text="positive" value={good/all*100}/>
        </tbody>
      </table>
    </div>
  )
}

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <div>
      <h1>Feedback.</h1>
      <CafeButton text="good" onClick={() => setGood(good+1)}/>
      <CafeButton text="neutral" onClick={() => setNeutral(neutral+1)}/>
      <CafeButton text="bad" onClick={() => setBad(bad+1)}/>
      <h1>Statistics.</h1>
      <Statistics good={good} neutral={neutral} bad={bad}/>
    </div>
  )
}

export default App