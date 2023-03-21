const supertest = require('supertest')
const app = require('../app')
const Blog = require('../models/blog')
const User = require('../models/user')
const api = supertest(app)

const initialBlogs = [
  { title: '1984', author: 'George Orwell', url: 'https://google.com', likes: '3', user: null },
  { title: 'brave new world', author: 'Aldous Huxley', url: 'https://bing.com', likes: '4', user: null }
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

const blogsInDb = async () => {
  const blogs = await Blog.find({})
  return blogs.map(blog => blog.toJSON())
}

const usersInDb = async () => {
  const users = await User.find({})
  return users.map(user => user.toJSON())
}

module.exports = {
  api,
  initialBlogs,
  getBlogLikes,
  getBlogTitles,
  blogsInDb,
  usersInDb
}
