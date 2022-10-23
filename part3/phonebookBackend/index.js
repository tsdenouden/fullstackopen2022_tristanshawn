// modules
require('dotenv').config()
const express = require('express')
const Person = require('./models/person')
const cors = require('cors')
const morgan = require('morgan')

// initialise express app
const app = express()

// middleware
app.use(express.static('build'))
app.use(express.json())
app.use(cors())
morgan.token('jsondata', (req, res) => JSON.stringify(req.body))
app.use(morgan('tiny'))

app.get('/info', (request, response) => {
  const date = new Date()
  Person.find({})
    .then(persons => {
      let count = persons.length
      response.send(`Phonebook has info for ${count} <br /> <br /> ${date}`)
    })
})

// fetch all documents from the collection and
// return them as an array of javascript objects
app.get('/api/persons', (request, response, next) => {
  Person
    .find({})
    .then(persons => {
      response.json(persons)
    })
    .catch(err => next(err))
})

// get a specific person document with the id specified in the request parameters
// return the person object as a json string
app.get('/api/persons/:id', (request, response, next) => {
  Person.findById(request.params.id)
    .then(returnedPerson => {
      response.json(returnedPerson)
    })
    .catch(err => next(err))
})

// morgan middleware used for logging requests
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :jsondata'))

// save person object as document in mongodb collection
app.post('/api/persons', (request, response, next) => {
  const body = request.body

  const person = new Person({
    name: body.name,
    number: body.number
  })

  person.save()
    .then(savedPerson => {
      response.json(savedPerson)
    })
    .catch(err => next(err))
})

// update a person document in the mongodb collection
app.put('/api/persons/:id', (request, response, next) => {
  const { name, number } = request.body

  Person.findByIdAndUpdate(
    request.params.id,
    { name, number },
    { new: true, runValidators: true, context: 'query' },
  )
    .then(updatedPerson => {
      response.json(updatedPerson)
    })
    .catch(err => next(err))
})

// delete a person from mongodb collection
app.delete('/api/persons/:id', (request, response, next) => {
  Person.findByIdAndDelete(request.params.id)
    .then(result => {
      console.log(result)
      response.status(204).end()
    })
    .catch(err => next(err))
})

// handle unknown endpoints by throwing response with 404 status code & error message
const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

app.use(unknownEndpoint)

// error handling
const errorHandler = (error, request, response, next) => {
  console.log(error.message)

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  } else if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message })
  }

  next(error)
}

app.use(errorHandler)

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on ${PORT}`)
})