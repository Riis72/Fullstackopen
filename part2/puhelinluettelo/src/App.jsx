import { useState, useEffect } from 'react'
import personService from './services/persons'

const Filter = (props) => {
  return(
    <div>
      filter shown with <input onChange={props.handleFilterChange} />
    </div>
  )
}

const PersonForm = (props) => {
  return(
    <form onSubmit={props.addPerson}>
    <div>
      name: <input value={props.newName} onChange={props.handleNameChange} />
    </div>
    <div>
      number: <input value={props.newNumber} onChange={props.handleNumberChange} />
    </div>
    <button type='submit'>add</button>
    </form>
  )
}
const Persons = ({ filteredUsers, handleDelete }) => {
  return(
    <ul>
      {filteredUsers.map((person => (<li key={person.id}> {person.name} {person.number} <button onClick={handleDelete(person.id)}>delete</button>  </li>)))}
      
    </ul>
  )
}


const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [searchFilter, setFilter] = useState('')


  const hook = () => {
    console.log('effect')
    personService
      .getAll()
      .then(allPersons => {
        setPersons(allPersons)
      })
  }
  
  useEffect(hook, [])

  const addPerson = (event) => {
    event.preventDefault()
    const nameObject = {
      name: newName,
      number: newNumber,
      important: true,
      id: newName
    }
    if (persons.find(person => person.name === newName)) {
      
      if (window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)) {
        const person = persons.find(p => p.name === newName)
        const changedPerson = { ...person, number: newNumber }
        personService
          .update(person.id, changedPerson)
            .then(returnedPerson => {
              setPersons(persons.map(person => person.id !== returnedPerson.id ? person : returnedPerson))
            })
      }
      
    }
    else {
      personService
        .create(nameObject)
          .then(personAdd => {
            setPersons(persons.concat(personAdd))
          })
      setNewName('')
      setNewNumber('')
    }
  }

  const handleDelete = (id) => (event) => {
    
    const person = persons.find(p => p.id === id)
    console.log('person', person)
    if (window.confirm(`Delete ${person.name}?`)) {
      personService
        .remove(id)
          .then(() => {
            setPersons(persons.filter(p => p.id !== id))
          
            
          })
    }
  }
 


  
      

  
  
    

  const handleNameChange = (event) => {
    event.preventDefault()
    setNewName(event.target.value)
  }

  
const handleNumberChange = (event) => {
  event.preventDefault()
  setNewNumber(event.target.value)
}
const handleFilterChange = (event) => {
  event.preventDefault()
  console.log('filter', event.target.value)
  setFilter(event.target.value)
}

const filteredUsers = persons.filter((person => person.name.toLowerCase().includes(searchFilter.toLowerCase()))) 

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter handleFilterChange={handleFilterChange} />
      <h2>add a new</h2>
      <PersonForm addPerson={addPerson} newName={newName} handleNameChange={handleNameChange} newNumber={newNumber} handleNumberChange={handleNumberChange} />
      <h2>Numbers</h2>
      <Persons filteredUsers={filteredUsers} handleDelete={handleDelete} />
    </div>
  )

}

export default App
