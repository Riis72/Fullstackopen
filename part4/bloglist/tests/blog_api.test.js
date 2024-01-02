const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const Blog = require('../models/blog')
const api = supertest(app)


const initialBlogs = [
    {
        _id: "5a422a851b54a676234d17f7",
        title: "React patterns",
        author: "Michael Chan",
        url: "https://reactpatterns.com/",
        likes: 7,
        __v: 0
    },
    {
        _id: "5a422aa71b54a676234d17f8",
        title: "Go To Statement Considered Harmful",
        author: "Edsger W. Dijkstra",
        url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
        likes: 5,
        __v: 0
    },
    {
        _id: "5a422b3a1b54a676234d17f9",
        title: "Canonical string reduction",
        author: "Edsger W. Dijkstra",
        url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
        likes: 12,
        __v: 0
    },
    {
        _id: "5a422b891b54a676234d17fa",
        title: "First class tests",
        author: "Robert C. Martin",
        url: "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll",
        likes: 10,
        __v: 0
    },
    {
        _id: "5a422ba71b54a676234d17fb",
        title: "TDD harms architecture",
        author: "Robert C. Martin",
        url: "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html",
        likes: 0,
        __v: 0
    },
    {
        _id: "5a422bc61b54a676234d17fc",
        title: "Type wars",
        author: "Robert C. Martin",
        url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
        likes: 2,
        __v: 0
    }
]


beforeEach(async () => {
    await Blog.deleteMany({})
    await Blog.insertMany(initialBlogs)
})
test('blogs are in json', async () => {
    await api
        .get('/api/blogs')
        .expect(200)
        .expect('Content-Type', /application\/json/)
})

test('there are right amount blogs', async () => {
    const response = await api.get('/api/blogs')
    expect(response.body).toHaveLength(initialBlogs.length)
})

test('all blogs have id defined', async () => {
    const response = await api.get("/api/blogs")
    response.body.forEach(blog => {

        expect(blog.id).toBeDefined()
    });
})



test('blog without title or url get status code 400', async () => {
    const blog = {

        author: "KK",
        likes: 11,

    }
    await api
        .post('/api/blogs')
        .send(blog)
        .expect(400)
})
test('blog likes can be updated', async () => {
    let blogsAtStart = await Blog.find({})
    const blogToUpdate = blogsAtStart[0]

    const newBlog = {
        title: "React patterns",
        author: "Michael Chan",
        url: "https://reactpatterns.com/",
        likes: 8,
    }

    await api
        .put(`/api/blogs/${blogToUpdate.id}`)
        .send(newBlog)
        .expect(200)
        .expect('Content-Type', /application\/json/)

    const blogsAtEnd = await Blog.find({})
    console.log(blogsAtEnd[0])
    expect(newBlog.likes).toEqual(blogsAtEnd[0].likes)
})
test('specific note can be deleted', async () => {
  let blogsAtStart = await Blog.find({})
  const blogToDelete = blogsAtStart[0]

  await api
      .delete(`/api/blogs/${blogToDelete.id}`)
      .expect(204)

    const blogs = await Blog.find({})
    const finalBlogs = blogs.map(blog => blog.toJSON())
    const ids = finalBlogs.map(blog => blog.id)

    expect(finalBlogs).toHaveLength(initialBlogs.length - 1)
    expect(ids).not.toContain(blogToDelete.id)



})
test('blog can be added', async () => {
    const blog = {
        title: "testi",
        author: "KK",
        url: "localhost",
        likes: 11,

    }
    await api
        .post('/api/blogs')
        .send(blog)
        .expect(201)
        .expect('Content-Type', /application\/json/)
    const blogs = await Blog.find({})

    const finalBlogs = blogs.map(blog => blog.toJSON())
    expect(finalBlogs).toHaveLength(initialBlogs.length + 1)


})





afterAll(async () => {
    await mongoose.connection.close()
})