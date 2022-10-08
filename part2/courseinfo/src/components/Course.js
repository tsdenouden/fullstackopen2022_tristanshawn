const Header = ({text}) => <h1>{text}</h1>

const Part = ({content}) => <li>{content}</li>

const Content = ({parts}) => {
    return (
        <ul>
            {parts.map(part =>
                <Part key={part.id} content={part.name}/>
            )}
        </ul>
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