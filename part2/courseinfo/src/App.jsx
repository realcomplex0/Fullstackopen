import Course from './components/Course.jsx'


const App = () => {
  const courses = [
    {
      name: 'Half Stack application development',
      id: 1,
      parts: [
        {
          part: 'Fundamentals of React', 
          exercises: 10,
          id: 1
        },
        {
          part: 'Using props to pass data', 
          exercises: 7,
          id: 2
        },
        {
          part: 'State of a component', 
          exercises: 14,
          id: 3
        },
        {
          part: 'Reducer',
          exercises: 3,
          id: 4
        }
      ]
    },
    {
      name: 'Node.js',
      id: 2,
      parts: [
        {
          part: 'Routing',
          exercises: 3,
          id: 1
        },
        {
          part: 'Middlewares',
          exercises: 7,
          id: 2
        }
      ]
    }
  ]

  return (
    <>
      <h1>Curriculum</h1>
      {courses.map((course) => {
        return (<Course key={course.id} course={course}/>)
      })}
    </>
    
  )
}

export default App
