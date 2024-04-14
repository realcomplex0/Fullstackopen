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
const personSchema = new mongoose.Schema({
  name: {
    type: String,
    minLength: 3,
    required: true
  },
  number: {
    type: String,
    validate : {
      validator: function(v) {
        return v.length >= 8 && /\d{2,3}-\d+$/.test(v)
      },
      message: props => `${props.value} is not a valid phone number!`,
      required: [true, 'Phone number is required']
    }
  }
})

personSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

module.exports = mongoose.model('Entry', personSchema)