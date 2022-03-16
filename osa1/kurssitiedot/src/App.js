const App = () => {
  const course = 'Half Stack application development'
  const part1 = {
    name: 'Fundamentals of React',
    exercises: 10
  }
  const part2 = {
    name: 'Using props to pass data',
    exercises: 7
  }
  const part3 = {
    name: 'State of a component',
    exercises: 14
  }

  return (
    <div>
      <Header course={course} />
      <Content osa1={part1.name} osa2={part2.name} osa3={part3.name} tehtavat1={part1.exercises} tehtavat2={part2.exercises} tehtavat3={part3.exercises} />
      <Total tehtavat1={part1.exercises} tehtavat2={part2.exercises} tehtavat3={part3.exercises} />
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

const Part = (props) => {
  return (
    <div>
      <p>{props.osa1} {props.tehtavat1}</p>
      <p>{props.osa2} {props.tehtavat2}</p>
      <p>{props.osa3} {props.tehtavat3}</p>
    </div>
  )
}
const Content = (props) => {
  
  return (
    <div>
      <Part osa1={props.osa1} tehtavat1={props.tehtavat1} />
      <Part osa2={props.osa2} tehtavat2={props.tehtavat2} />
      <Part osa3={props.osa3} tehtavat3={props.tehtavat3} />
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
