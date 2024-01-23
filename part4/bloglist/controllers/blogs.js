const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const {request} = require("express")
const jwt = require('jsonwebtoken')

/*const getTokenForm = (request, response, next) => {
    const authorization = request.get('authorization')
    if (authorization && authorization.startsWith('Bearer ')) {
        return authorization.replace('Bearer ', '')
    }
}*/
blogsRouter.get('/', async(request, response) => {

    const blogs = await Blog.find({}).populate('user', {username: 1, name: 1 })
    response.json(blogs)
})

blogsRouter.post('/', async (request, response) => {
    const blog = new Blog(request.body)
    const decodedToken = jwt.verify(request.token, process.env.SECRET)
    if (!decodedToken.id) {
        return response.status(401).json({ error: 'token invalid' })
    }
    const user = request.user
    blog.user = user._id
    if (!blog.likes) {
        blog.likes = 0
    }
    if (!blog.url || !blog.title) {
        response.status(400).end()
    }
    const savedBlog = await blog.save()
    user.blogs = user.blogs.concat(savedBlog._id)
    await user.save()

    response.status(201).json(savedBlog)
})

blogsRouter.delete('/:id', async (request, response) => {
    const decodedToken = jwt.verify(request.token, process.env.SECRET)
    if (!decodedToken.id){
        return response.status(401).json({ error: 'token invalid' })
    }
    const user = request.user
    const blog = await Blog.findById(request.params.id)
    console.log(blog.user.toString())
    console.log(user)
    if (blog.user.toString() === user._id.toString()) {
        await Blog.findByIdAndDelete(request.params.id)
        response.status(204).end()
    }
    else {
        return response.status(400).json( {error: 'invalid token '})
    }



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