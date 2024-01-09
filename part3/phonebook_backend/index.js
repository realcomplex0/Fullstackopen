const express = require('express')
const app = express()
const morgan = require('morgan')
const cors = require('cors')

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
    response.json(people)
})

app.get('/api/persons/:idx', (request, response) => {
    const index = request.params.idx
    const person = people.find(p => p.id == index)
    if(person){
        response.json(person)
    }
    else{
        response.status(404).end()
    }
})

app.get('/info', (request, response) => {
    console.log(request.headers)
    response.send(`<p>Phonebook has info for ${people.length} people</p> <p>${new Date()}</p>`)
})

app.delete('/api/persons/:idx', (request, response) => {
    const index = request.params.idx
    people = people.filter(p => p.id != index)
    console.log(people)
    response.status(204).end()
})

const rand_id = () => {
    return Math.floor(Math.random() * 1000)
}

app.post('/api/persons', (request, response) => {
    const data = request.body
    if(!data.name || !data.number){
        return response.status(400).end()
    }
    const another = people.find(p => p.name.toLowerCase() == data.name.toLowerCase())
    if(another){
        return response.status(400).json({
            error: 'name is not unique'
        })
    }
    const new_person = {
        id: rand_id(),
        name: data.name,
        number: data.number
    }
    people.push(new_person)
    console.log(people)
    response.json(new_person)
})

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
    console.log(`Server listening on PORT ${PORT}`)
})
