const express = require('express')
const morgan = require('morgan')

const app = express()

morgan.token('jsondata', (req, res) => JSON.stringify(req.body))
app.use(morgan('tiny'))
app.use(express.json())

let phonebook = [
    { 
        "id": 1,
        "name": "Arto Hellas", 
        "number": "040-123456"
      },
      { 
        "id": 2,
        "name": "Ada Lovelace", 
        "number": "39-44-5323523"
      },
      { 
        "id": 3,
        "name": "Dan Abramov", 
        "number": "12-43-234345"
      },
      { 
        "id": 4,
        "name": "Mary Poppendieck", 
        "number": "39-23-6423122"
      }
]

// example route:
// app.get('/', (request, response) => {
//     response.send('<h1>Hello World!</h1>')
// })

app.get('/info', (request, response) => {
    const date = new Date()
    response.send(`Phonebook has info for ${phonebook.length} <br /> <br /> ${date}`)
}) 

app.get('/api/persons', (request, response) => {
    response.json(phonebook)
})

app.get('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    const person = phonebook.find(person => person.id === id)

    if (person) {
        response.json(person)
    } else {
        response.status(404).end()
    }
})

app.use(morgan(':method :url :status :res[content-length] - :response-time ms :jsondata'))

app.post('/api/persons', (request, response) => {
    const body = request.body

    if (!body.name || !body.number) {
        return response.status(400).json({
            error: 'content missing'
        })
    }

    const check = phonebook.find(person => person.name === body.name)
    if (check) {
        return response.status(400).json({
            error: 'name is already in phonebook'
        })
    }

    const newPerson = {
        id: randomNumber(100000000,100000000000000),
        name: body.name,
        number: body.number
    }

    phonebook = phonebook.concat(newPerson)
    response.json(newPerson)
})

app.delete('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    phonebook = phonebook.filter(person => person.id !== id)

    response.status(204).end()
})

const randomNumber = (n1, n2) => {
    min = Math.ceil(n1)
    max = Math.floor(n2)
    return Math.floor(Math.random() * (max - min) + min)
}

// const PORT = 3001
// app.listen(PORT, () => {
//   console.log(`Server running on port ${PORT}`)
// })

const PORT = 3001
app.listen(PORT, () => {
    console.log(`Server running on ${PORT}`)
})




// random stuff for me to remember:
// npm run dev -- start app with nodemon
// npm start -- start app without nodemon (doesn't restart server after changes)

// app.use(express.json())  -- middleware function
// json parser takes the JSON data of a request and transforms it into a js object and
// attaches it to the body property of the request object