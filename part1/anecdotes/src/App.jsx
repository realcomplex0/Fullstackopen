import { useState } from 'react'

const NextButton = ({setSelected, arrLength}) => {
  function getRandomInt(max) {
    return Math.floor(max * Math.random())
  }
  const handleClick = () => {
      const rand = getRandomInt(arrLength)
      setSelected(rand)
  }
  return <button onClick={handleClick}>Next anecdote</button>
}

const VoteButton = ({selected, votes, setVotes}) => {
  const handleClick = () => {
    const newVotes = votes.map((c,i) => {
      if(i == selected){
        return c + 1
      }
      else{
        return c
      }
    })
    setVotes(newVotes)
  }
  return <button onClick={handleClick}>Vote</button>
}

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.'
  ]
  const arr = Array(anecdotes.length).fill(0)
  const [selected, setSelected] = useState(0)
  const [votes, setVotes] = useState(arr)

  function findMaxIndex(arr){
    let id = 0
    for(let i = 0; i < arr.length; i ++ ){
      if(arr[i] > arr[id]){
        id = i;
      }
    }
    return id
  }

  return (
    <div>
      <p>{anecdotes[selected]}</p>
      <p>current votes count: {votes[selected]}</p>
      <VoteButton selected={selected} votes={votes} setVotes={setVotes} />
      <NextButton setSelected={setSelected} arrLength={anecdotes.length}/>
      <h1>Most popular anecdote</h1>
      <p>{anecdotes[findMaxIndex(votes)]} has {votes[findMaxIndex(votes)]} votes</p>
    </div>
  )
}

export default App
