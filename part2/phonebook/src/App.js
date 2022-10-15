import { useState, useEffect } from 'react'
import axios from 'axios'

const Filter = ({search, updateSearch}) => {
  return (
    <div>
      search for person in phonebook: 
      <input value={search} onChange={(event) => {updateSearch(event.target.value)}}/>
    </div>
  )
}

const PersonForm = ({formSubmit, formInput}) => {
  return (
    <div>
      <form onSubmit={formSubmit}>
        name: <input value={formInput.newName} onChange={(event) => formInput.setNewName(event.target.value)}/>
        <br />  
        number: <input value={formInput.newNumber} onChange={(event) => formInput.setNumber(event.target.value)}/>
        <button type="submit">add</button>
      </form>
    </div>
  )
}

const Persons = ({persons, search}) => {
  return (
    <div>
      <ul style={{listStylePosition: "none", padding: 0}}>
        {persons.filter(person => 
            person.name.toLowerCase().includes(search.toLowerCase())).map(person =>
              <li key={person.id}>{person.name} {person.number}</li>
        )}
      </ul>
    </div>
  )
}

const App = () => {
  // filter/query people from phonebook
  const [newSearch, setSearch] = useState('')

  // phonebook state
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNumber] = useState('')

  // fetch persons from db.json
  const fetchPersons = () => {
    axios
      .get('http://localhost:3001/persons')
      .then(response => {
        setPersons(response.data)
      })
  }

  useEffect(fetchPersons, [])

  // names of people
  const names = persons.map(person => person.name)

  // add a new name
  const addName = (event) => {
    event.preventDefault()
    if (names.includes(newName)) {
      alert(`${newName} is already added to the phonebook.`)
      return
    }

    const nameObject = {
      name: newName,
      number: newNumber,
      id: persons.length + 1
    }

    setPersons(persons.concat(nameObject))
    setNewName('')
    setNumber('')
  }

  return (
    <div>
      <h2>Phonebook</h2>

      <Filter search={newSearch} updateSearch={setSearch}/>
    
      <h2>add new</h2>
      <PersonForm formSubmit={addName} formInput={{newName, newNumber, setNewName, setNumber}}/>

      <h2>Numbers</h2>
      <Persons persons={persons} search={newSearch}/>

    </div>
  )
}

export default App