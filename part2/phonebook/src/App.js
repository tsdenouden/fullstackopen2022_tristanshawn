import { useState } from 'react'

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
      <ul>
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
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNumber] = useState('')

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