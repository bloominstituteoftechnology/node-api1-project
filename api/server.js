// BUILD YOUR SERVER HERE
const express = require('express');

const User = require('./users/model');

const server = express();

server.use(express.json());

// GET /api/users

server.get('/api/users', (req, res) => {
    User.find()
        .then(users => {
            //console.log(users);
            res.status(200).json(users)
        })
        .catch(err => {
            res.status(500).json({ message: "The users information could not be retrieved" })
        })
})

module.exports = server; // EXPORT YOUR SERVER instead of {}
