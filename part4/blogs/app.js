const express = require('express')
const app = express()
const cors = require('cors')
const mongoose = require('mongoose')
const config = require('./utils/config')
const logger = require('./utils/logger')

app.use(cors())
app.use(express.json())

const blogController = require('./controllers/blogController')
const blogMiddleware = require('./utils/middleware')

app.use(blogMiddleware.pathLogger)

app.use('/api/blogs', blogController)

app.use(blogMiddleware.unknownEndpoint)
app.use(blogMiddleware.errorHandler)

module.exports = app