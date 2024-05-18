const express = require('express')
const blogRouter = express.Router()
const Blog = require('../models/blog')

blogRouter.get('/', async (request, response) => {
    const blogs = await Blog.find({})
    response.json(blogs)
})

blogRouter.post('/', async (request, response, next) => {
    const blogObject = new Blog(request.body)
    const result = await blogObject.save()
    response.status(201).json(result)
})

blogRouter.delete('/:id', async (request, response, next) => {
    await Blog.findByIdAndDelete(request.params.id)
    response.status(204).end()
})

blogRouter.put('/:id', async (request, response, next) => {
    const body = request.body
    const blog = {
        title: body.title,
        author: body.author,
        url: body.url,
        likes: body.likes
    }
    console.log(blog)
    const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, blog, {new : true})
    response.json(updatedBlog)
})

module.exports = blogRouter