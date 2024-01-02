const Header = (props) => {
    return (
        <h2>{props.course.name}</h2>
    )
}

const Part = (props) => {
    return (
        <p key={props.data.id}>{props.data.part} {props.data.exercises}</p>
    )
}

const Content = (props) => {
    return (
        <>
        {props.classes.map((part) => {
            return <Part key={part.id} data={part} />
        })}
        </>
    ) 
}

const Total = (props) => {
    return (
        <>
            <p><strong>Number of exercises: {props.classes.reduce((s, part) => {
                console.log('CUR: ', s, part);
                return s + part.exercises
            }, 0)}</strong></p>
        </>
    )
}

const Course = (props) => {
    return (
        <>
            <Header course={props.course} />
            <Content classes={props.course.parts} />
            <Total classes={props.course.parts} />
        </>
    )  
}

export default Course