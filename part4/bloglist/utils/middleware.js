const jwt = require('jsonwebtoken')
const User = require('../models/user')
const tokenExtractor = (request, response, next) => {
    const authorization = request.get('authorization')
    if (authorization && authorization.startsWith('Bearer ')) {
        request.token = authorization.replace('Bearer ', '')
        next()
    }
    else {
        next()
    }
}

const userExtractor = async (request, response, next) => {

    if (request.token) {
        const token = request.token
        const decodedToken = jwt.verify(token, process.env.SECRET)
        const user = await User.findById(decodedToken.id)
        request.user = user

    }
    next()
}

module.exports = {
    tokenExtractor,
    userExtractor
}