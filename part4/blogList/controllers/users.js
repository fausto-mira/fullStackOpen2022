require('express-async-errors')
const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const User = require('../models/user')

usersRouter.get('/', async (request, response) => {
  const users = await User.find({}).populate('blogs', {
    title: 1,
    author: 1,
    url: 1,
    likes: 1
  })
  response.json(users)
})

usersRouter.post('/', async (request, response) => {
  const { body } = request
  const { username, name, password } = body

  if (!username || !password) { return response.status(400).json({ error: 'username and password required' }) }

  if (username.length <= 3 || password.length <= 3) {
    return response.status(400).json({ error: 'username and password must have min length of 3' })
  }

  const saltRounds = 10
  const passwordHash = await bcrypt.hash(password, saltRounds)

  // console.log(`USERNAME ${username}`)

  const user = new User({
    username,
    name,
    passwordHash
  })

  const savedUser = await user.save()

  response.json(savedUser)
})

module.exports = usersRouter
