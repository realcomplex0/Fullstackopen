const config = require('../utils/config')
const logger = require('../utils/logger')
const mongoose = require('mongoose')

mongoose.set('strictQuery', false)
mongoose.connect(config.MONGODB_URI)
.then(result => {
    logger.info("Connected to MongoDB")
})
.catch(err => {
    logger.error("DB connection error", err.message)
})

const blogSchema = new mongoose.Schema({
    title: String,
    author: String,
    url: String,
    likes: Number
})

const Blog = mongoose.model('Blog', blogSchema)

module.exports = Blog