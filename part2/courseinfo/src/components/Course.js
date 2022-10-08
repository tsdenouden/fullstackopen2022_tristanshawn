const Header = ({text}) => <h1>{text}</h1>

const Part = ({content}) => (
    <li>{content.name} {content.exercises}</li>
)

const Content = ({parts}) => {
    const total = parts.reduce((sum, part) => {
        return sum + part.exercises
    }, 0)
    return (
        <div>
            <ul style={{listStylePosition: "none", padding: 0}}>
                {parts.map(part =>
                    <Part key={part.id} content={part}/>
                )}
            </ul>
            <p>
                <b>total of {total} exercises</b>
            </p>
        </div>
    )
}

const Course = ({course}) => {
    return (
        <div>
            <Header text={course.name}/>
            <Content parts={course.parts}/>
        </div>
    )
}

export default Course