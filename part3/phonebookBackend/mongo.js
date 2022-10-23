const mongoose = require('mongoose')

if (process.argv.length < 3) {
    console.log('usage: node mongo.js <password>')
    process.exit(1)
}

const password = process.argv[2]

const url = `mongodb+srv://fullstack:${password}@cluster0.cgs2e1p.mongodb.net/?retryWrites=true&w=majority`

const personSchema = new mongoose.Schema({
    name: String,
    number: Number
})

const Person = mongoose.model('Person', personSchema)

if (process.argv.length === 3) {
    mongoose
        .connect(url)
        .then((result) => {
            Person
                .find({})
                .then(persons => {
                    console.log('phonebook:')
                    persons.forEach(person => {
                        console.log(person.name, person.number)
                    })
                    mongoose.connection.close()
                })
                .catch((err) => console.log(err))
        })
    
}

if (process.argv.length === 5) {
    mongoose
        .connect(url)
        .then((result) => {
            console.log('connected')

            const person = new Person({
                name: process.argv[3],
                number: process.argv[4]
            })

            return person.save()
        })
        .then(() => {
            console.log('person saved')
            return mongoose.connection.close()
        })
        .catch((err) => console.log(err))
}