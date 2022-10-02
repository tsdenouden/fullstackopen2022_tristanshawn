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
      <p>{props.name} {props.exercises}</p>
    </div>
  )
}

const Content = (props) => {
  return (
    <div>
      <Part name={props.parts[0].name} exercises={props.parts[0].ex} />
      <Part name={props.parts[1].name} exercises={props.parts[1].ex} />
      <Part name={props.parts[2].name} exercises={props.parts[2].ex} />
    </div>
  ) 
}

const Total = (props) => {
  return (
    <div>
      <p>
        Number of excercises {props.parts[0].ex + props.parts[1].ex + props.parts[2].ex}
      </p>
    </div>
  ) 
}

const App = () => {
  const course = {
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        ex: 10
      }, 
      {
        name: 'Using props to pass data',
        ex: 7
      },
      {
        name: 'State of a component',
        ex: 14
      }
    ]
  }

  return (
    <div>
      <Header course={course.name} />
      <Content parts={course.parts} />
      <Total parts={course.parts} />
    </div>
  )
}

export default App