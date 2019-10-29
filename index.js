console.log('its alive');

const express = require('express');

const db = require('./data/db');

const server = express(); //creates a server

server.get('/', (req, res) => {
    res.send('hello new node 23');
})

server.get('/api/users', (req, res) => {
    const users = req.params
})

server.get('/api/users/:id', (req, res) => {
    const id = req.params.id;

    users.findById(id)
    .then(user => {
        if(user === []) {
            res.status(404).json({ message: "Can not find user with this id"})
        } else {
            res.json(user)
        }
    })
    .catch(err => {
        console.log('find by id error', err);
        res.status(500).json({ error: "information for this user is non-existant"})
    })   
})

server.delete('/api/users/:id', (req, res) => {
    const id = req.params.id;

    db.remove(id)
    .then(user => {
        res.status(200).json({ message: 'user with id ${id} deleted' })
    })
    .catch(err => {
        console.log('error', err);
        res.status(404).json({ error: 'the user with this id does not exist'});
    })
})

const port = 5000;
server.listen(port, () => console.log('\n--- api is on ===\n'))