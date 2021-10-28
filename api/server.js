// BUILD YOUR SERVER HERE
const express = require('express');
const server = express();
const users = require('./users/model')

//Creates a user using the information sent inside the `request body`.                                   |
server.post('/api/users',(req, res) => {
    users.insert(req.params.name, req.params.bio)
    .then(user => {
        res.status(201).json(user)
    })
    .catch(err => {
        console.log(err)
        res.status(500).json({ message: "Please provide name and bio for the user" })
    })
});

// Returns an array users.
server.get('/api/users',(req,res) => {
    users.find()
    .then(users => {
        res.status(200).json(users)
    })
    .catch(err => {
        res.status(500).json({ message: "The users information could not be retrieved"})
    })
});

//Returns the user object with the specified id
server.get('/api/users/:id', (req, res) => {
    users.findById(req.params.id)
        .then(user => {
            if (user) {
                res.status(200).json(user)
            } else {
                res.status(404).json({ message: "The user with the specified ID does not exist"})
            }
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({ message: err.message })
        })
})

//Removes the user with the specified `id` and returns the deleted user.
server.delete('/api/users/:id', (req, res) => {
    users.remove(req.params.id)
        .then(user => {
            if (user) {
                res.status(200).json(user)
            } else {
                res.status(404).json({ message: "The user could not be removed"
                })
            }
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({ message: err.message })
        })
})

//Updates the user with the specified `id` 
server.put('/api/users/:id', async (req, res) => {
    const { id } = req.params
    const { changes } = req.body
    try{
        const result = await users.update(id, changes)
        res.status(200).json(result)
    } catch {
        console.log(err)
        res.status(500).json({ message: "The user with the specified ID does not exist" })
    }
})


module.exports = server; // EXPORT YOUR SERVER instead of {}
