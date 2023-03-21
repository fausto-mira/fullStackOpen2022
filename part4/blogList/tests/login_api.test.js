const mongoose = require('mongoose')
const { api, blogsInDb } = require('../utils/helper')
const User = require('../models/user')
const Blog = require('../models/blog')
const bcrypt = require('bcrypt')
// const jwt = require('jsonwebtoken')

describe('when there is initially one user in db', () => {
  beforeEach(async () => {
    jest.setTimeout(30000)
    await User.deleteMany({})

    const passwordHash = await bcrypt.hash('sekret', 10)
    const user = new User({ username: 'root', name: 'test', passwordHash })

    await user.save()
  })

  test('sucessful login with correct username and password', async () => {
    const validUser = { username: 'root', password: 'sekret' }
    await api.post('/api/login').send(validUser).expect(200)
  })

  test('failed login with incorrect username and password', async () => {
    const validUser = { username: 'root', password: 'SEKRET' }
    await api.post('/api/login').send(validUser).expect(401)
  })

  test('logged user can create a blog', async () => {
    const validUser = { username: 'root', password: 'sekret' }
    const response = await api.post('/api/login').send(validUser).expect(200)
    const token = response.body
    const auth = { Authorization: `bearer ${token}` }

    await Blog.deleteMany({})
    const newBlog = { title: 'Narnia', author: 'Wenseslao', url: 'https://apple.com', likes: 5 }
    await api.post('/api/blogs').set(auth).send(newBlog).expect(201)
  })

  test('invalid user can not create a blog', async () => {
    const validUser = { username: 'root', password: 'sekret' }
    await api.post('/api/login').send(validUser).expect(200)
    const badAuth = { Authorization: 'bearer afaasfasdf' }

    await Blog.deleteMany({})
    const newBlog = { title: 'Narnia', author: 'Wenseslao', url: 'https://apple.com', likes: 5 }
    await api.post('/api/blogs').set(badAuth).send(newBlog).expect(401)
  })

  test('logged user can delete own blog', async () => {
    const validUser = { username: 'root', password: 'sekret' }
    const response = await api.post('/api/login').send(validUser).expect(200)
    const token = response.body
    const auth = { Authorization: `bearer ${token}` }

    await Blog.deleteMany({})
    const newBlog = { title: 'Narnia', author: 'Wenseslao', url: 'https://apple.com', likes: 5 }
    await api.post('/api/blogs').set(auth).send(newBlog)

    const blogs = await blogsInDb()
    await api.delete(`/api/blogs/${blogs[0].id}`).set(auth).expect(204)
  })

  test('invalid user can not delete a blog', async () => {
    const validUser = { username: 'root', password: 'sekret' }
    const response = await api.post('/api/login').send(validUser).expect(200)
    const token = response.body
    const auth = { Authorization: `bearer ${token}` }

    await Blog.deleteMany({})
    const newBlog = { title: 'Narnia', author: 'Wenseslao', url: 'https://apple.com', likes: 5 }
    await api.post('/api/blogs').set(auth).send(newBlog)

    const blogs = await blogsInDb()
    const invalidAuth = { Authorization: 'bearer lol' }
    await api.delete(`/api/blogs/${blogs[0].id}`).set(invalidAuth).expect(401)
  })
})

afterAll(() => {
  mongoose.disconnect()
})
