const express = require('express')
const app = express()
require('express-async-errors')
app.use(express.json())
const cors = require('cors')
const mongoose = require('mongoose')
const middleware = require('./utils/middleware')
const logger = require('./utils/logger')
const config = require('./utils/config')
const blogsRouter = require('./controllers/blogs')
const usersRouter = require('./controllers/users')
const loginRouter = require('./controllers/login')
app.use(middleware.tokenExtractor)
app.use(middleware.userExtractor)
app.use('/api/blogs', blogsRouter)
app.use('/api/users', usersRouter)
app.use('/api/login', loginRouter)


mongoose.connect(config.MONGODB_URI)
console.log('Mongodb connected')

app.use(cors())


module.exports = app