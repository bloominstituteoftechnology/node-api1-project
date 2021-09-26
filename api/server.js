const express = require('express');
const User = require('./users/model.js')
const server = express();
server.use(express.json())

server.get('/', (req, res) => {
    res.status(200).json({ message: 'Sanity Test. You Are Sane!!' })
})

server.get('/users', (req, res) => {
    User.find()
        .then(user => {
            res.status(200).json(user)
        })
        .catch(res.status(500), error => console.log(error));
})

server.get('/users/:id', (req, res) => {
    res.json({ message: 'get user by id is working' })
})



module.exports = server;
