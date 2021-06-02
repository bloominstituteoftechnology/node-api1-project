const express = require('express');
const User = require('./users/model')
// BUILD YOUR SERVER HERE


const server = express();

//GLOBAL MIDDLEWARE
server.use(express.json())

//ENDPOINTS
server.get('/', (req, res) => {
    res.send('Hello World')
})

server.post('/api/users', (req, res) => {
    console.log(req.body)
    User.insert(req.body)
    .then( res => res.status(201).json('worked'))
    .catch( err => res.status(501).json({error: 'something bad happened'}))
})

server.get('/api/users', (req, res) => {
    User.find()
    .then( users => res.json(users))
    .catch(err => {
        res.status(500).json({message: 'something bad happened'})
    })
})

server.get('/api/users/:id', (req, res) => {
    User.findById(req.params.id)
    .then( user => res.json(user))
    .catch( err => {
        err.status(500).json({message: 'soemthing bad happened'})
    })
})

server.delete('/api/users/:id', (req, res) => {
    User.remove(req.params.id)
    .then( user => res.json({message: `removed ${user}`}))
    .catch( err => {
        err.status(501).json({message: 'sopmething bad happened'})
    })
})

server.put('/api/users/:id', (req, res) => {
    const id = req.params.id;
    User.update(id, req.body)
    .then( user => res.status(201).json({message: user}))
    .catch( err => {
        err.status(501).json({message: err})
    })
})


module.exports = server; // EXPORT YOUR SERVER instead of {}
