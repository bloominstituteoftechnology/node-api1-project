// BUILD YOUR SERVER HERE
const express = require('express')
const server = express.Router()


server.use(expres.json())


const usersRouter = require('./users/users-router')


server.use('/api/users', usersRouter)




module.exports = server ; // EXPORT YOUR SERVER instead of {}

