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

app.post('/api/notes', (request, response) => {
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
})

app.get('/', (request, response) => {
  response.send('<h1>Hello there</h1>')
})

app.get('/api/notes/', (request, response) => {
  Note.find({}).then(results => {
    response.json(results)
  })  
})

app.get('/api/notes/:id', (request, response) => {
  const id = request.params.id
  Note.findById(id).then(note => {
    response.json(note)
  })
  .catch(err => {
    response.status(400).end()
  })
})

app.put('/api/notes/:id', (request, response) => {
  const newNotes = request.body
  const id = Number(request.params.id)
  const res = notes.map((note) => {
    if(note.id == id){
      return newNotes;
    }
    else{
      return note;
    }
  })
  notes = res;
  response.json(newNotes)
})

app.delete('/api/notes/:id', (request, response) => {
  const id = Number(request.params.id)
  notes = notes.filter(note => note.id !== id)
  
  response.status(204).end()
})

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})