// BUILD YOUR SERVER HERE

const express = require('express')
const User = require('./users/model') // grab them from model
const server = express()

server.get('/api/users', (req, res) => {
    res.json('users')
})

server.use('*', (req, res) => {
    res.status(404).json({
        message: 'not found'
    })
})

module.exports = server; // EXPORT YOUR SERVER instead of {}
 