require('dotenv').config()
const express = require('express')
const app = express()
const morgan = require('morgan')
const cors = require('cors')
const Person = require('./models/person')

app.use(express.json())
app.use(express.static('dist'))
app.use(cors({orgin : ["http://localhost:5173"]}))
morgan.token('body', (request, response) => {
    return JSON.stringify(request.body)
})

app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'))

let people = [
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

app.get('/api/persons', (request, response) => {
    Person.find({}).then(results => {
        console.log(results)
        response.json(results)
    })
})

app.get('/api/persons/:idx', (request, response) => {
    const index = request.params.idx
    Person.findById(index).then(person => {
        if(person){
            response.json(person)
        }
        else{
            response.status(404).end()
        }
    })
    .catch(err => next(err))
})

app.put('/api/persons/:id', (request, response) => {
    const index = request.params.id
    const body = request.body
    console.log(body)
    const newPerson = {
        name: body.name,
        number: body.number,
    }
    Person.findByIdAndUpdate(index, newPerson, { new: true})
        .then(nPerson => {
            response.json(nPerson)
        })
        .catch(err => next(err))
})

app.get('/info', (request, response) => {
    console.log(request.headers)
    Person.countDocuments({}).then(count => {
        response.send(`<p>Phonebook has info for ${count} people</p> <p>${new Date()}</p>`)
    })
    .catch(err => next(err))
})

app.delete('/api/persons/:idx', (request, response, next) => {
    const index = request.params.idx
    Person.findByIdAndDelete(index)
    .then(result => {
        response.status(204).end();
    })
    .catch(err => next(err));
})

const rand_id = () => {
    return Math.floor(Math.random() * 1000)
}

app.post('/api/persons', (request, response) => {
    const data = request.body
    if(!data.name || !data.number){
        return response.status(400).end()
    }
    const person = new Person({
        name: data.name,
        number: data.number
    })
    person.save().then(nPerson => {
        response.json(nPerson)
    })
})

const errorHandler = (error, request, response, next) => {
    console.error(error.message)
  
    if(error.name === 'CastError'){
      return response.status(400).send({ error: 'Bad ID'})
    }
  }

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
    console.log(`Server listening on PORT ${PORT}`)
})

app.use(errorHandler)