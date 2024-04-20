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

const errorHandler = (request, response, error, next) => {
    logger.error(error.message)
    response.status(500).send({error : "Internal server error"})
    next(err)
}

module.exports = {
    pathLogger, unknownEndpoint, errorHandler
}