import { useState, useEffect } from 'react'

import personsService from './services/persons'

const Notification = ({message, error=false}) => {
  const notifSuccess = {
    color: 'green',
    backgroundColor: 'rgb(213, 227, 200)',
    fontSize: 24,
    border: '5px solid green',
    borderRadius: '0.375rem',
    padding: '10px',
    marginBottom: '15px'
  }

  const notifError = {
    color: 'red',
    backgroundColor: 'rgb(242, 194, 189)',
    fontSize: 24,
    border: '5px solid red',
    borderRadius: '0.375rem',
    padding: '10px',
    marginBottom: '15px'
  }

  
  if (message === null) {
    return null
  }
  
  if (!error) {
    return (
      <div style={notifSuccess}>
        {message}
      </div>
    )
  } else {
    return (
      <div style={notifError}>
        {message}
      </div>
    )
  }
}

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
        <br />
        <button type="submit">add</button>
      </form>
    </div>
  )
}

const Persons = ({persons, search, deletePerson}) => {
  return (
    <div>
      <ul style={{listStylePosition: "none", padding: 0}}>
        {persons.filter(person => 
            person.name.toLowerCase().includes(search.toLowerCase())).map(person =>
              <li key={person.id}>
                {person.name} {person.number} 
                <button onClick={() => {deletePerson(person.id)}}>delete</button> 
              </li>
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

  const [errorMessage, setError] = useState(null)
  const [errorType, setErrorType] = useState(false)

  // fetch list of people from from db.json
  const fetchPersons = () => {
    personsService
      .getAll()
      .then(allPeople => {
        setPersons(allPeople)
      })
  }

  useEffect(fetchPersons, [])

  // names of people
  const names = persons.map(person => person.name)

  // add a new person to the phonebook
  const addName = (event) => {
    event.preventDefault()
    // if the phonebook already includes that person,
    // ask the user if they want to update that person's info.
    if (names.includes(newName)) {
      if (window.confirm(`${newName} is already added to the phonebook,replace the old number with a new one?`)) {
        // get person object & change number
        let person = persons.filter(person => person.name === newName)
        person = person[0]
        person.number = newNumber

        // update person in db.json
        personsService
          .updatePerson(person.id, person)
          .then(changedPerson => {
            // update persons state with array including changed person
            setPersons(persons.map(person => (person.id === changedPerson.id)? person=changedPerson : person))
            setErrorType(false)
            setError(`${person.name}'s information has been updated.`)
          })
      }

      return
    }

    // new person object
    const nameObject = {
      name: newName,
      number: newNumber,
    }

    // push person object to db.json & persons state
    personsService
      .addPerson(nameObject)
      .then(returnedPerson => {
        setPersons(persons.concat(returnedPerson))
        setNewName('')
        setNumber('')
        setErrorType(false)
        setError(`${returnedPerson.name} has been added to the phonebook.`)
      })    
  }

  // delete a person
  const deletePerson = (id) => {
    personsService
      .getPerson(id)
      .then(person => {
        if (window.confirm(`Delete ${person.name}?`)) {
          personsService
            .deletePerson(person.id)
            .then(info => {
              setPersons(persons.filter(person => person.id !== id))
              setErrorType(false)
              setError(`${person.name} has been deleted from the phonebook.`)
            })
        }
      })
      .catch(error => {
        let person = persons.filter(person => (person.id === id))
        person = person[0]
        setErrorType('true')
        setError(`${person.name} has already been deleted from the phonebook.`)
        setPersons(persons.filter(person => person.id !== id))
      })
  }

  return (
    <div>
      <h2>Phonebook</h2>

      <Notification message={errorMessage} error={errorType}/>

      <Filter search={newSearch} updateSearch={setSearch}/>
    
      <h2>add new</h2>
      <PersonForm formSubmit={addName} formInput={{newName, newNumber, setNewName, setNumber}}/>

      <h2>Numbers</h2>
      <Persons persons={persons} search={newSearch} deletePerson={deletePerson}/>

    </div>
  )
}

export default App