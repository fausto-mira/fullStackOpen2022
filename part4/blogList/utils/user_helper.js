const supertest = require('supertest')
const app = require('../app')
const user = require('../models/user')
const api = supertest(app)

const usersInDb = async () => {
  const users = await user.find({})
  return users.map(user => user.toJSON())
}

module.exports = { api, usersInDb }
