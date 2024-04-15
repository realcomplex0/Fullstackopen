require('dotenv').config()
const express = require('express')
const app = express()
const morgan = require('morgan')
const cors = require('cors')
const Person = require('./models/person')

app.use(express.json())
app.use(express.static('dist'))
app.use(cors({ orgin : ['http://localhost:5173'] }))
morgan.token('body', (request, response) => {
  return JSON.stringify(request.body)
})

app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'))

app.get('/api/persons', (request, response) => {
  console.log('Call api/persons')
  Person.find({}).then(results => {
    console.log('Received', results)
    response.json(results)
  })
})

app.get('/api/persons/:idx', (request, response, next) => {
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

app.put('/api/persons/:id', (request, response, next) => {
  const index = request.params.id
  const body = request.body
  console.log(body)
  const newPerson = {
    name: body.name,
    number: body.number,
  }
  Person.findByIdAndUpdate(index, newPerson, { new: true, runValidators: true })
    .then(nPerson => {
      response.json(nPerson)
    })
    .catch(err => next(err))
})

app.get('/info', (request, response, next) => {
  console.log(request.headers)
  Person.countDocuments({}).then(count => {
    response.send(`<p>Phonebook has info for ${count} people</p> <p>${new Date()}</p>`)
  })
    .catch(err => next(err))
})

app.delete('/api/persons/:idx', (request, response, next) => {
  const index = request.params.idx
  Person.findByIdAndDelete(index)
    .then(res => {
      response.status(204).end()
    })
    .catch(err => next(err))
})

app.post('/api/persons', (request, response, next) => {
  const data = request.body
  const person = new Person({
    name: data.name,
    number: data.number
  })
  person.save().then(nPerson => {
    response.json(nPerson)
  })
    .catch(err => next(err))
})

const errorHandler = (error, request, response, next) => {
  if(error.name === 'CastError'){
    return response.status(400).send({ error: 'Bad ID' })
  }
  else if(error.name === 'ValidationError'){
    return response.status(400).send({ error: error.message })
  }
}

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server listening on PORT ${PORT}`)
})

app.use(errorHandler)