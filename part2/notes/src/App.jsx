import Note from './components/Note'
import axios from 'axios'
import { useState, useEffect } from 'react';
import noteService from './services/notes'
import Notification from './components/Notification'
import './index.css'

const Footer = () => {
  const footerStyle = {
    color: 'green',
    fontStyle: 'italic',
    fontSize: 16
  }
  return (
    <div style={footerStyle}>
      <br />
      <em>Note app, Department of Computer Science, University of Helsinki 2023</em>
    </div>
  )
}

const App = () => {
  const [notes, setNotes] = useState()
  const [newNote, setNewNote] = useState('...')
  const [showAll, setShowAll] = useState(true)
  const [errorMessage, setErrorMessage] = useState()

  
  useEffect(() => {
    noteService.getAll(setErrorMessage)
    .then(newNotes => {
      setNotes(newNotes)
    })
  }, [])
  
  const validNotes = () => {
    if(notes) return notes
    else return []
  }

  const notesToShow = showAll ? validNotes() : (
    validNotes().filter((note) => {
      if(note.important === true)
        return true
      else
        return false
    }
  ))

  const toggleDisplay = (event) => {
    setShowAll(!showAll)
  }
  
  const toggleImportance = (index) => {
    console.log(`importance of ${index} needs to change`)
    const curNote = notes.find(n => n.id == index)
    const newNote = {...curNote, important: !curNote.important}


    noteService.update(index, newNote)
    .then( returnedNote => {
        setNotes(notes.map(n => {
          if(n.id == index) return returnedNote
          else return n
        }));
      }) 
    .catch(error => {
        setErrorMessage(`Note ${curNote.content} was DELETED`)
        setTimeout(() => {
            setErrorMessage(null)
        }, 5000)
        setNotes(notes.filter(nt => {
          if(nt.id != index){
            return true;
          }
          else{
            return false;
          }
        }))
    })
  }

  const addNote = (event) => {
    event.preventDefault()
    const NoteObject = {
      content: newNote,
      important: Math.random() < 0.5,
      id: notes.length + 1,
    }
    noteService.create(NoteObject).then(returnedNote => {
      setNotes(notes.concat(returnedNote))
      setNewNote('')
    })
  }

  const changeInput = (event) => {
    setNewNote(event.target.value);
  } 

  return (
    <div>
      <h1>Notes</h1>
      <input type="checkbox" id="check" checked={showAll} onChange={toggleDisplay}></input>
      <Notification message={errorMessage} />
      <label htmlFor="check">Show all?</label>
      <button onClick={() => setShowAll(!showAll)}>Toggle</button>
      <p>Checkbox is {showAll ? "checked" : "unchecked"}</p>
      <form onSubmit={addNote}>
          <input value={newNote} onChange={changeInput}/>
          <button type="submit">save</button>
      </form>
      <ul>
        {notesToShow.map(
          (note) => { 
              return (
                <Note key={note.id} note={note} toggleImportance={() => toggleImportance(note.id)}/>
              )
            }
          )}
      </ul>
      <Footer />
    </div>
  )
}

export default App