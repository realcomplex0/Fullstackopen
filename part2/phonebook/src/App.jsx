import { useState } from 'react'
import axios from 'axios'
import { useEffect } from 'react'
import { PersonForm } from './components/PersonForm'
import Notification from './components/Notification'
import bookService from './services/phonebook'
import './index.css'

const Filter = ({filter, setFilter}) => {
  const changeFilter = (event) => {
    setFilter(event.target.value)
  }
  return (
    <div>
      Filter by name: <input value={filter} onChange={changeFilter}></input>
    </div>
  )
}

const Persons = ({persons, setPersons}) => {

  const handleDelete = (id, name) => {
    if(window.confirm(`Delete ${name} from the phone book?`)){
      bookService
      .deletePerson(id)
      .then(() => {
        setPersons(persons.filter((pp) => {
          return pp.id != id
        }))
      })
      .catch(() => {
        console.log("Illegal!");
      })
    }
  }

  return persons.map((value) => {
    return (
      <div key={value.id}>
        {value.name} {value.number}
        <button onClick={() => handleDelete(value.id, value.name)}> delete </button>
      </div>
    )
  })
}


const App = () => {
  const [persons, setPersons] = useState([
    
  ]) 

  const [notification, setNotification] = useState(null);

  useEffect(() => {
    bookService.
    getAll().then((response) => {
      setPersons(response)
    })
  }, [])

  const [filter, setFilter] = useState('')

  const displayPerson = persons.filter((person) => {
    return person.name.toLowerCase().includes(filter.toLowerCase())
  })

  console.log('should be', notification)
  return (
    <div>
      <h2>Phonebook</h2>
      <Notification notif={notification} />
      <h2>Filter</h2>
      <Filter filter={filter} setFilter={setFilter}/>
      <h2>Add a member to the phonebook</h2>
      <PersonForm persons={persons} setPersons={setPersons} setNotification={setNotification}/>
      <h2>Numbers</h2>
      <Persons persons={displayPerson} setPersons={setPersons}/>
    </div>
  )
}

export default App