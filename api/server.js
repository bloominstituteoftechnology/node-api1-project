const express = require('express');
const User = require('./users/model.js')
const server = express();
server.use(express.json())

server.get('/', (req, res) => {
    res.status(200).json({ message: 'Sanity Test. You Are Sane!!' })
})

server.get('/api/users', (req, res) => {
    User.find()
        .then(user => {
            res.status(200).json(user)
        })
        .catch(res.status(500), error => console.log(error));
})

server.get('/api/users/:id', (req, res) => {
    res.json({ message: 'get user by id is working' })
})

server.post('/api/users', (req, res) =>{
    res.json({ message: 'POST new dog working' })
    
})

server.put('/api/users/:id', (req, res) => {
    res.json({message: 'PUT update to existing user working!'})
})

server.delete('/api/users/:id', (req, res) =>{
    res.json({message: `DELETE user with id ${req.params.id}`})
})

module.exports = server;
