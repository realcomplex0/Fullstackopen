export const Header = (props) => {
    return (
        <h2>{props.course}</h2>
    )
}

const Part = (props) => {
    return (
        <p>{props.part.name} {props.part.exercises}</p>
    )
}

export const Content = (props) => {
    return (
        <div>
            <Part part={props.parts[0]}/>
            <Part part={props.parts[1]}/>
            <Part part={props.parts[2]}/>
        </div>
    ) 
}

export const Total = (props) => {
    return (
        <>
            <p>Number of exercises: {props.parts[0].exercises + props.parts[1].exercises + props.parts[2].exercises} </p>
        </>
    )
}
