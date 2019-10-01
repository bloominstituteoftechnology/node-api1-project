// implement your API here
const express = require('express');

const db = require('./data/db.js');

const server = express();
server.use(express.json());

server.get('/api/users', (req, res) => {
    db.find()
        .then(users => res.json(users))
        .catch(err => {
            res.status(500).json({
                err: err,
                message: 'failed to get users' 
            })
        })
});

server.get('/api/users/:id', (req, res) => {
    const id = req.params.id;
    db.findById(id)
        .then(user => res.json(user));
})

server.post('/api/users', (req, res) => {
    const newUser = req.body;
    console.log('new user', newUser)
    db.insert(newUser)
        .then(user => res.status(201).json(user))
        .catch(err => {
            res.status(500).json({
                err: err,

            })
        })
})

server.delete('/api/users/:id', (req, res) => {
    const id = req.params.id;
    db.remove(id)
        .then(deletedUser => {
            console.log(deletedUser)
            res.json(deletedUser)
        })
        .catch(err => {
            res.status(500).json({
                err: err,
                message: 'failed to delete'
            })
        }) 
})

server.listen(8000, () => console.log('server on 8000'));
