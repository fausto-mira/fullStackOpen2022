const mongoose = require('mongoose')
const Blog = require('../models/blog')
const { api, initialBlogs, getBlogLikes, getBlogTitles } = require('../utils/helper')

beforeEach(async () => {
  jest.setTimeout(30000)
  await Blog.deleteMany({})
  for (const blog of initialBlogs) {
    const blogObject = new Blog(blog)
    await blogObject.save()
  }
})

describe('when there is initially some blogs saved', () => {
  test('all blogs are returned', async () => {
    const response = await getBlogTitles()
    expect(response).toHaveLength(initialBlogs.length)
  })

  test('blogs are returned as json', async () => {
    await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })

  describe('viewing a specific blog', () => {
    test('unique identificator called id', async () => {
      const response = await api.get('/api/blogs')
      expect(response.body[0].id).toBeDefined()
    })
  })

  describe('addition of a new blog', () => {
    test('sucessfull with valid data', async () => {
      const newBlog = { title: 'Narnia', author: 'Wenseslao', url: 'https://apple.com', likes: 5 }
      await api.post('/api/blogs').send(newBlog).expect(201)

      const titles = await getBlogTitles()
      expect(titles).toHaveLength(initialBlogs.length + 1)
      expect(titles).toContain('Narnia')
    })

    test('when likes property is absent, sets default 0', async () => {
      const newBlog = { title: 'Jumanji', author: 'Random', url: 'https://adidas.com' }
      await api.post('/api/blogs').send(newBlog).expect(201)

      const likes = await getBlogLikes()
      expect(likes[likes.length - 1]).toBe(0)
      expect(likes).toHaveLength(initialBlogs.length + 1)
    })

    test('fails with status code 400 if data invalid', async () => {
      const newBlog = { author: 'Random', url: 'https://adidas.com' }

      await api.post('/api/blogs').send(newBlog).expect(400)

      const response = await api.get('/api/blogs')
      expect(response.body).toHaveLength(initialBlogs.length)
    })
  })

  describe('deletion of a blog', () => {
    test('succeeds with status code 204 if id is valid', async () => {
      let blogs = await api.get('/api/blogs')

      await api.delete(`/api/blogs/${blogs.body[1].id}`).expect(204)

      blogs = await api.get('/api/blogs')
      expect(blogs.body).toHaveLength(initialBlogs.length - 1)
    })
  })
  describe('update of a blog', () => {
    test('update likes', async () => {
      const blogs = await api.get('/api/blogs')
      const idToUpdate = blogs.body[0].id
      const updatedBlog = {
        title: blogs.body[0].title,
        author: blogs.body[0].author,
        url: blogs.body[0].url,
        likes: 5
      }
      await api.put(`/api/blogs/${idToUpdate}`).send(updatedBlog).expect(200)
    })
    test('try update with invalid data', async () => {
      const blogs = await api.get('/api/blogs')
      const idToUpdate = 1234
      const updatedBlog = {
        title: blogs.body[0].title,
        author: blogs.body[0].author,
        url: blogs.body[0].url,
        likes: 10
      }
      await api.put(`/api/blogs/${idToUpdate}`).send(updatedBlog).expect(400)
    })
  })
})

afterAll(() => {
  mongoose.connection.close()
})
