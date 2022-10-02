const Header = (props) => {
  return (
    <>
      <h1>{props.course}</h1>
    </>
  )
}

const Part = (props) => {
  return (
    <>
      <p>{props.name} {props.exercises}</p>
    </>
  )
}

const Content = (props) => {
  return (
    <>
      <Part name={props.p1} exercises={props.ex1} />
      <Part name={props.p2} exercises={props.ex2} />
      <Part name={props.p3} exercises={props.ex3} />
    </>
  ) 
}

const Total = (props) => {
  return (
    <>
      <p>
        Number of excercises {props.ex1 + props.ex2 + props.ex3}
      </p>
    </>
  ) 
}

const App = () => {
  const course = 'Half Stack application development'
  
  const parts = {p1: 'Fundamentals of React', p2: 'Using props to pass data', p3: 'State of a component'}
  const exercises = {ex1: 10, ex2: 7, ex3: 14}

  return (
    <>
      <Header course={course} />
      <Content {...parts} {...exercises} />
      <Total {...exercises} />
    </>
  )
}

export default App