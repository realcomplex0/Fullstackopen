const logger = require('../utils/logger')

const pathLogger = (request, response, next) => {
  logger.info('Method:', request.method)
  logger.info('Path:  ', request.path)
  logger.info('Body:  ', request.body)
  logger.info('---')
  next()
}

const unknownEndpoint = (request, response) => {
    response.status(404).send({error : 'bad path'})
}

const errorHandler = (error, request, response, next) => {
    if(error.name === 'ValidationError') {
        response.status(400).send({error : "Bad request"})
    }
    else{
        response.status(500).send({error : "Internal server error"})
    }
    next(err)
}

module.exports = {
    pathLogger, unknownEndpoint, errorHandler
}