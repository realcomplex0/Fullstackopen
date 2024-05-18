const config = require('../utils/config')
const mongoose = require('mongoose')

const url = config.MONGODB_URI

mongoose.set('strictQuery', false)
mongoose.connect(url)
.then(result => {
    console.log('connected to MongoDB')
})
.catch(err => {
    console.log('couldnt connect:', err.message)
})
const noteSchema = new mongoose.Schema({
  content: {
      type: String,
      minLength: 5,
      required: true
    },
    important: Boolean,
})

noteSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

module.exports = mongoose.model('Note', noteSchema)