const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const {request} = require("express");

blogsRouter.get('/', async(request, response) => {
    const blogs = await Blog.find({})
    response.json(blogs)
})

blogsRouter.post('/', async (request, response) => {
    const blog = new Blog(request.body)
    if (!blog.likes) {
        blog.likes = 0
    }
    if (!blog.url || !blog.title) {
        response.status(400).end()
    }
    const savedBlog = await blog.save()
    response.status(201).json(savedBlog)
})

blogsRouter.delete('/:id', async (request, response) => {
    await Blog.findByIdAndDelete(request.params.id)
    response.status(204).end()

})

blogsRouter.put('/:id', async (request, response) => {
    const id = request.params.id

    const blog = {
        title: request.body.title,
        author: request.body.author,
        url: request.body.url,
        likes: request.body.likes
    }

    const updatedNote = await Blog.findByIdAndUpdate(id, blog, { new: true })
    response.json(updatedNote.toJSON())
})

module.exports = blogsRouter