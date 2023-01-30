const app = require('./app')
const config = require('./utils/config')
const logger = require('./utils/logger')

// app.use(express.json())

app.listen(config.PORT, () => {
  logger.info(`Server running on port ${config.PORT}`)
})