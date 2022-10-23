const mongoose = require('mongoose')

const url = process.env.MONGODB_URI

console.log('connecting to', url)

mongoose.connect(url)
    .then(result => {
        console.log('connected to MongoDB')
    })
    .catch(err => {
        console.log('error connecting to MongoDB:', err)
    })

const personSchema = new mongoose.Schema({
    name: {
        type: String,
        minLength: 3,
        required: true
    },
    number: {
        type: String,
        required: true,
        validate: [(val) => {
            // check if the number split into more than 2 parts
            if ((val.split('-').length) >= 3) {
                return false
            }
            // check if the first part has less than 2 numbers
            if ((val.indexOf('-')) === 1) {
                return false
            }
            // check if there are letters in the number
            if (!Number(val.replace('-',''))) {
                return false
            }
            // check if the number is longer than 8 characters
            const number = val.replace('-','')
            return number.length >= 8
        }, 'Please enter a valid number.']
    }
})

// change id from object to string & delete _id, __v
personSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = String(returnedObject._id)
        delete returnedObject._id
        delete returnedObject.__v
    }
})

module.exports = mongoose.model('Person', personSchema)
