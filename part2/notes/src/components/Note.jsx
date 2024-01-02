
const Note = ({ note, toggleImportance }) => {

  return (
    <li className='note'>
      {note.content}
      <p>{note.important ? "True" : "False"}</p> 
      <button onClick={toggleImportance}> Toggle button! </button>
    </li>
    
  )
}

export default Note