require('dotenv').config()
const express = require('express')
const cors = require('cors')
const Note = require('./models/note')

let notes = [
  {
    id: 1,
    content: "HTML is easy",
    important: true
  },
  {
    id: 2,
    content: "Browser can execute only JavaScript yo?",
    important: false
  },
  {
    id: 3,
    content: "GET and POST are the most important methods of HTTP protocol",
    important: true
  }
]

const app = express()

app.use(express.static('dist'))

app.use(express.json())

app.use(cors({orgin : ["http://localhost:5173"]}))

const genId = () => {
  return notes.length > 0 ? Math.max(...notes.map(n => n.id)) + 1 : 1
}

app.post('/api/notes', (request, response, next) => {
  const body = request.body
  console.log(request.headers)
  if(!body.content){
    return response.status(400).json({
      error: 'content not found'
    })
  }
  console.log(body)
  const note = new Note({
    content: body.content,
    important: Boolean(body.important)
  })
  note.save().then(savedNote => {
    response.json(savedNote)
  })
  .catch(err => next(err))
})

app.get('/', (request, response) => {
  response.send('<h1>Hello there</h1>')
})

app.get('/api/notes/', (request, response) => {
  Note.find({}).then(results => {
    response.json(results)
  })  
})

app.get('/api/notes/:id', (request, response, next) => {
  const id = request.params.id
  Note.findById(id).then(note => {
    if(note){
      response.json(note)
    }
    else{
      response.status(404).end()
    }
  })
  .catch(err => next(err)
    // console.log(err)
    // response.status(400).send({error: 'malformatted id'})
  )
})

app.put('/api/notes/:id', (request, response, next) => {
  const {content, important} = request.body
  Note.findByIdAndUpdate(request.params.id, {content, important}, { new: true, runValidators: true, context: 'query'})
    .then(updatedNote => {
      response.json(updatedNote)
    }) 
    .catch(err => next(err))
})

app.delete('/api/notes/:id', (request, response, next) => {
  Note.findByIdAndDelete(request.params.id)
    .then(result => {
      response.status(204).end();
    })
    .catch(err => next(err))
})

const errorHandler = (error, request, response, next) => {
  console.error(error.message)

  if(error.name === 'CastError'){
    return response.status(400).send({ error: 'malformatted id'})
  }
  else if(error.name === 'ValidationError'){
    return response.status(400).json({ error: error.message })
  }
}

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})

app.use(errorHandler)