require('dotenv').config()
const mongoose = require('mongoose')

if(process.argv.length < 2){
    console.log('Lacks arguments')
    process.exit(1)
}

const password = process.argv[2]
const url = process.env.MONGODB_URI
const entrySchema = new mongoose.Schema({
    name: String,
    number: String,
})

const Entry = mongoose.model('Entry', entrySchema)

mongoose.set('strictQuery', false)
mongoose.connect(url)

if (process.argv.length<5) {
    Entry.find({}).then(persons => {
        persons.map(pp => {
            console.log(pp.name, pp.number)
        })
        mongoose.connection.close()
    })
}
else{
    const new_name = process.argv[3]
    const new_number = process.argv[4]

    const entry = new Entry({
        name: new_name,
        number: new_number,
    })

    entry.save().then(result => {
        console.log('Added to database', new_name, 'number', new_number, 'to phonebook')
        mongoose.connection.close()
    })
}
