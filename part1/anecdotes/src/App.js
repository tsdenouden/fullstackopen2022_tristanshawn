import { useState } from 'react'

const Button = ({text, onClick}) => <button onClick={onClick}>{text}</button>

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.'
  ]

  const [selected, setSelected] = useState(0)
  const [votes, setVotes] = useState(new Uint32Array(anecdotes.length))
  const [featured, setFeatured] = useState(0)

  const randomSelect = (min, max) => {
    min = Math.ceil(min)
    max = Math.floor(max)
    setSelected(Math.floor(Math.random() * (max-min+1) + min))
  }

  const voteAnecdote = (index) => {
    const copy = [...votes]
    copy[index] += 1
    setVotes(copy)

    const topVote = Math.max(...copy)
    setFeatured(copy.indexOf(topVote))
  }

  return (
    <div>
      <h1>Anecdote of the day</h1>
      <p>{anecdotes[selected]}</p>
      <p>has {votes[selected]} votes</p>
      <Button text="vote" onClick={() => voteAnecdote(selected)}/>
      <Button text="next anecdote" onClick={() => randomSelect(0,6)}/>

      <h1>Anecdote with most votes</h1>
      <p>{anecdotes[featured]}</p>
    </div>
  )
}

export default App