require('express-async-errors')
const blogsRouter = require('express').Router()
const { userExtractor } = require('../utils/middleware')
const Blog = require('../models/blog')
const User = require('../models/user')

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate('user', {
    username: 1
  })
  response.json(blogs)
})

blogsRouter.post('/', userExtractor, async (request, response) => {
  const newBlog = request.body
  const user = request.user

  if (newBlog.title === undefined || newBlog.url === undefined || newBlog.title === '' || newBlog.url === '') {
    return response.status(400).json('no title/url')
  }

  const userPosting = await User.findById(user.id)

  const blog = new Blog({
    title: newBlog.title,
    author: newBlog.author,
    url: newBlog.url,
    likes: newBlog.likes || 0,
    user: userPosting._id
  })

  const savedBlog = await blog.save()
  userPosting.blogs = userPosting.blogs.concat(savedBlog._id)
  await userPosting.save()

  response.status(201).json(savedBlog)
})

blogsRouter.delete('/:id', userExtractor, async (request, response) => {
  const user = request.user
  const blog = await Blog.findById(request.params.id)

  if (user.id !== blog.user.toString()) {
    return response.status(400).json('blog can be deleted only by creator')
  }

  await Blog.findByIdAndRemove(request.params.id)
  response.status(204).end()
})

blogsRouter.put('/:id', userExtractor, async (request, response) => {
  const user = request.user
  const blog = await Blog.findById(request.params.id)

  if (user.id !== blog.user.toString()) {
    return response.status(400).json('blog can be deleted only by creator')
  }

  const updatedBlog = {
    likes: request.body.likes
  }
  const result = await Blog.findByIdAndUpdate(request.params.id, updatedBlog, { new: true })
  if (result) { response.status(200).json(result) } else response.status(400)
})

module.exports = blogsRouter
