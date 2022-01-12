// BUILD YOUR SERVER HERE
const express = require('express')
const User = require('./users/model')

const server = express()

server.use(express.json())

server.get('/', (req, res) => {
    res.send('Hello')
})

server.get('/api/users', (req, res) => {
    console.log('getting users');
    User.find()
    .then(users => {
        res.json(users)
    })
    .catch(err => {
        res.status(500).json({
            message: 'error getting users',
            err: err.message,
            stack: err.stack
        })
    })
})
module.exports = server; // EXPORT YOUR SERVER instead of {}
