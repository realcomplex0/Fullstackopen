import { useState } from 'react'
import axios from 'axios'
import bookService from '../services/phonebook'

export const PersonForm = ({persons, setPersons, setNotification}) => {
    const [newName, setNewName] = useState('')
    const [newNumber, setNewNumber] = useState('')
    const changeName = (event) => {
      setNewName(event.target.value)
    }
  
    const changeNumber = (event) => {
      setNewNumber(event.target.value)
    }
  
  
    const handleSubmit = (event) => {
      event.preventDefault();
      const res = persons.filter((person) => person.name == newName)
      if (res.length > 0) {
        if(window.confirm(`${newName} is already in the phonebook, replace the old number maybe?`)){
          const newPerson = 
          {
            name: res[0].name,
            number: newNumber,
            id: res[0].id
          }
          bookService
          .replaceNumber(res[0].id, newPerson)
          .then(response => {
            setPersons(persons.map(pp => {
              if(pp.id == response.id){
                return response
              }
              else{
                return pp
              }
            }))
            setNewName('')
            setNewNumber('')
          })
          .catch((error) => {
            setNotification({message: error.response.data.error, type: 'error'});
          })
        }
      }
      else{
        const newPerson =
        {
          name: newName, 
          number: newNumber,
          id: persons.length + 1
        }
        bookService
        .addPerson(newPerson)
        .then(res => {
          setPersons(persons.concat(res))
          setNotification({message: `${res.name} has been added to the phonebook`, type: 'success'})
          setNewName('')
          setNewNumber('')
          setTimeout(() => setNotification(), 5000)
        })
        .catch(error => {
          setNotification({message: error.response.data.error, type: 'error'})
        })
      }
    }
    return (
      <form>
        <div>
          name: <input value={newName} onChange={changeName}></input>
        </div>
        <div>
          number: <input value={newNumber} onChange={changeNumber}></input>
        </div>
        <div>
          <button type="submit" onClick={handleSubmit}>add</button>
        </div>
      </form>
    )
  }