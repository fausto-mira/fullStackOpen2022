// const http = require('http')
const express = require('express')
const app = express()
const cors = require('cors')
const logger = require('./utils/logger')
const middleware = require('./utils/middleware')
const config = require('./utils/config')
const mongoose = require('mongoose')
const blogsRouter = require('./controllers/blogs')

// Desactivate deprecation warning
mongoose.set('strictQuery', true)

logger.info('connecting to', config.MONGODB_URI)

mongoose.connect(config.MONGODB_URI)
  .then(() => {
    logger.info('connected to MongoDB')
  })
  .catch((error) => {
    logger.error('error connecting to MongoDB:', error.message)
  })

app.use(cors())
app.use(express.json())
app.use(middleware.requestLogger)

app.get('/', (request, response) => {
  response.send('<h1>Blog list</h1>')
})

app.use('/api/blogs', blogsRouter)

app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

module.exports = app
