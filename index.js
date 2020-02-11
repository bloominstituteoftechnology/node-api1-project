const express = require('express');
const Users = require('./data/db');

const server = express();

server.get('/api/users', (req, res) => {
    Users.find().then(users => {
        res.status(200).json(users);
    }).catch(err => console.log(err))
});

server.get('/api/users/:id', (req, res) => {
    Users.findById(':id')
})

const port = 5000;
server.listen(port, () => console.log('Hurray!'));