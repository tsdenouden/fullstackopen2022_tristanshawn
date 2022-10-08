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

const Course = (props) => (
    <div>
        <Header text={props.name}/>
        <Content parts={props.parts}/>
    </div>
)

export default Course