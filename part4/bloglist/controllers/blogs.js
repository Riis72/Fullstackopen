const router = require('express').Router()
const Blog = require('../models/blog')

const { userExtractor } = require('../utils/middleware')

router.get('/', async (request, response) => {
    const blogs = await Blog
        .find({})
        .populate('user', { username: 1, name: 1 })

    response.json(blogs)
})

router.post('/', userExtractor, async (request, response) => {
    const blog = new Blog(request.body)
    const user = request.user

    if (!user) {
        return response.status(403).json({ error: 'user missing' })
    }

    if (!blog.title || !blog.url) {
        return response.status(400).json({ error: 'title or url missing' })
    }

    blog.likes = blog.likes || 0
    blog.user = user._id

    user.blogs = user.blogs.concat(blog._id)
    await user.save()

    const savedBlog = await blog.save()
    const populatedBlog = await savedBlog.populate('user', { username: 1, name: 1 })

    response.status(201).json(populatedBlog)
})


router.put('/:id', async (request, response) => {
    const { title, url, author, likes } = request.body

    const updatedBlog = await Blog.findByIdAndUpdate(
        request.params.id,
        { title, url, author, likes },
        { new: true }
    ).populate('user', { username: 1, name: 1 })

    response.json(updatedBlog)
})

router.delete('/:id', userExtractor, async (request, response) => {
    const blog = await Blog.findById(request.params.id)

    const user = request.user

    if (!user || blog.user.toString() !== user.id.toString()) {
        return response.status(401).json({ error: 'operation not permitted' })
    }
    await Blog.findByIdAndRemove(blog.id)
    user.blogs = user.blogs.filter(b => b.toString() !== blog.id.toString() )

    await user.save()


    response.status(204).end()
})

module.exports = router