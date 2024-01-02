const express = require('express')
const app = express()
require('express-async-errors')
app.use(express.json())
const cors = require('cors')
const mongoose = require('mongoose')
const logger = require('./utils/logger')
const config = require('./utils/config')
const blogsRouter = require('./controllers/blogs')
app.use('/api/blogs', blogsRouter)


mongoose.connect(config.MONGODB_URI)

app.use(cors())


module.exports = app