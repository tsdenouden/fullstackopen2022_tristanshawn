require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const Person = require('./models/person')
const cors = require('cors')
const morgan = require('morgan')

const app = express()

app.use(express.static('build'))
app.use(express.json())
app.use(cors())
morgan.token('jsondata', (req, res) => JSON.stringify(req.body))
app.use(morgan('tiny'))

app.get('/info', (request, response) => {
    const date = new Date()
    response.send(`Phonebook has info for ${Person.length} <br /> <br /> ${date}`)
}) 

app.get('/api/persons', (request, response) => {
    Person
        .find({})
        .then(persons => {
            response.json(persons)
        })
        .catch(err => {
            response.status(400).json({
                error: 'cant fetch list of people'
            })
        })
})

app.get('/api/persons/:id', (request, response) => {
    Person.findById(request.params.id)
        .then(returnedPerson => {
            response.json(returnedPerson)
        })
        .catch(err => {
            response.status(400).json({
                error: 'invalid id'
            })
        })
})

app.use(morgan(':method :url :status :res[content-length] - :response-time ms :jsondata'))

app.post('/api/persons', (request, response) => {
    const body = request.body

    if (body.name === undefined || body.number === undefined) {
        return response.status(400).json({
            error: 'content missing'
        })
    }

    const person = new Person({
        name: body.name,
        number: body.number
    })

    person.save().then(savedPerson => {
        response.json(savedPerson)
    })
})

app.delete('/api/persons/:id', (request, response) => {
    Person.findByIdAndDelete({ _id: mongoose.Types.ObjectId(request.params.id) })
        .then(result => {
            console.log(result)
            response.status(204).end()
        })
        .catch(err => {
            return response.status(400).json({
                error: err
            })
        })
})

const randomNumber = (n1, n2) => {
    min = Math.ceil(n1)
    max = Math.floor(n2)
    return Math.floor(Math.random() * (max - min) + min)
}

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
    console.log(`Server running on ${PORT}`)
})