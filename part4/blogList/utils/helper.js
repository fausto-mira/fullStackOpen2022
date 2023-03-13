const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)

const initialBlogs = [
  { title: '1984', author: 'George Orwell', url: 'https://google.com', likes: '3' },
  { title: 'brave new world', author: 'Aldous Huxley', url: 'https://bing.com', likes: '4' }
]

const getBlogTitles = async () => {
  const response = await api.get('/api/blogs')
  const titles = response.body.map(blog => blog.title)
  return titles
}

const getBlogLikes = async () => {
  const response = await api.get('/api/blogs')
  const likes = response.body.map(blog => blog.likes)
  return likes
}

module.exports = { api, initialBlogs, getBlogLikes, getBlogTitles }
