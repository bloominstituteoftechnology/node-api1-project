// BUILD YOUR SERVER HERE
const model = require('./users/model');
const express = require('express');
const server = express();
server.use(express.json())

server.get('/api/users', (req, res) => {
    model.find()
    .then(users => {
        res.status(200).json(users)
    })
    .catch(err => {
        res.status(500).json({message: err.message})
    })
});

server.get('/api/users/:id', (req, res) => {
    const { id } = req.params;

    model.findById(id)
    .then(user => {
        user
        ? res.status(200).json(user)
        : res.status(404).json({message: `no user with id ${id}`})
    })
    .catch(err => {
        res.status(500).json({message: err.message})
    })
})
module.exports = server; // EXPORT YOUR SERVER instead of {}