const App = () => {
  const course = 'Half Stack application development'
  const part1 = 'Fundamentals of React'
  const exercises1 = 10
  const part2 = 'Using props to pass data'
  const exercises2 = 7
  const part3 = 'State of a component'
  const exercises3 = 14

  return (
    <div>
      <Header course={course} />
      <Content osa1={part1} osa2={part2} osa3={part3} tehtavat1={exercises1} tehtavat2={exercises2} tehtavat3={exercises3} />
      <Total tehtavat1={exercises1} tehtavat2={exercises2} tehtavat3={exercises3} />
    </div>
  )
}

const Header = (props) => {
  return (
  <div>
    <h1>{props.course}</h1>
  </div>
  )
}
const Content = (props) => {
  console.log(props)
  return (
    <div>
      <p>{props.osa1} {props.tehtavat1}</p>
      <p>{props.osa2} {props.tehtavat2}</p>
      <p>{props.osa3} {props.tehtavat3}</p>
    </div>
  )
}

const Total = (props) => {
  return (
    <div>
      <p>
        Number of exercises {props.tehtavat1 + props.tehtavat2 + props.tehtavat3}
      </p>
    </div>
  )
}

export default App
