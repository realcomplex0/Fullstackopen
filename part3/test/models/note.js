const mongoose = require('mongoose')

const url = process.env.MONGODB_URI

console.log('got url', url)

mongoose.set('strictQuery', false)
mongoose.connect(url)
.then(result => {
    console.log('connected to MongoDB')
})
.catch(err => {
    console.log('couldnt connect:', err.message)
})
const noteSchema = new mongoose.Schema({
  content: String,
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