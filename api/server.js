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

// POST /api/users
server.post('/api/users', (req, res) => {

    const newUser = req.body;

    if (!newUser.name || !newUser.bio) {
        res.status(400).json({message: "Please provide name and bio for the user" });
    }

    User.insert(newUser)
        .then(user => {
            res.status(201).json(user)
        }).catch(err => {
            res.status(500).json({ message: "There was an error while saving the user to the database" })
        })
})

// GET /api/users/:id
server.get('/api/users/:id', (req, res) => {
    const {id} = req.params
    User.findById(id)
        .then(user => {
            // findById could return null if id is not found
            if (!user) {
                res.status(404).json({message: "The user with the specified ID does not exist" })
            }
            res.json(user);
        }).catch(err => {
            res.status(500).json({message: "The user information could not be retrieved"})
        })
})

// DELETE /api/users/:id

server.delete('/api/users/:id', (req,res) => {
    const {id} = req.params
    User.remove(id)
        .then(user => {
            if (!user) {
                res.status(404).json({message: "The user with the specified ID does not exist" })
            } else {
                res.json(user)
            }
        }).catch(err => {
            res.status(500).json({message: "The user could not be removed" })
        })
})

module.exports = server; // EXPORT YOUR SERVER instead of {}
