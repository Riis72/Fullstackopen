import { useState } from 'react'

const Button = (props) => (
  <button onClick={props.handleClick}>
    {props.text}
  </button>
)

const StatisticLine = ({ text, value }) => {
  return (
    <>
      <td>
        {text}
      </td>
      <td>
        {value}
      </td>
    </>
  )
}



const Statistics = (props) => {
  const sum = props.good + props.bad + props.neutral
  const avarage = (props.good + (props.bad * -1)) / sum

  if (sum === 0) {
    return(
    <p>No feedback given</p>
    )
  }

  return (
    <>
    <table>
    <tbody>
    <tr><StatisticLine text='good' value={props.good} /></tr>
    <tr><StatisticLine text='neutral' value={props.neutral} /></tr>
    <tr><StatisticLine text='bad' value={props.bad} /></tr>  
    <tr><StatisticLine text='all' value={sum} /></tr>
    <tr><StatisticLine text='avarage' value={avarage} /></tr>
    <tr><StatisticLine text='positive' value={props.good / (props.neutral + props.bad) *100  + "%"} /></tr>
    
    </tbody>
    </table>
    </>
  )
   
}




const App = () => {
  // tallenna napit omaan tilaansa
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
      <h1>give feedback</h1>
      <Button handleClick={handleGood} text='good' />
      <Button handleClick={handleNeutral} text='neutral' />
      <Button handleClick={handleBad} text='bad' />

      <h1>statistics</h1>
      <Statistics good={good} bad={bad} neutral={neutral} />
      

    </div>
  )
}


export default App

