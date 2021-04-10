// Imports
const express = require('express')
const User = require('./users/model')
 
// Express instance with middleware
const server = express()
server.use(express.json())

 
// Endpoints
// POST | /api/users | Creates a user using the information sent inside the `request body`.
server.post('/api/users', (req, res) => {
    const newUser = req.body
    if (!newUser.name || !newUser.bio) {
        res.status(400).json({ message: 'Please provide name and bio for the user' })
    }
    else {
        User.insert(newUser)
            .then(user => {
                res.status(201).json(user)
            })
            .catch(err => {
                res.status(500).json({ message: 'There was an error while saving the user to the database' })
            })
    }
})
 
// GET | /api/users/:id | Returns the user object with the specified `id`.
server.get('/api/users/:id', (req, res) => {
    const { id } = req.params
    User.findById(id)
        .then(user => {
            const [ status, json ] = user 
                ? [200, user] 
                : [404, { message: 'The user with the specified ID does not exist' }]
            res.status(status).json(json)
        })
        .catch(err => {
            res.status(500).json({ message: 'The user information could not be retrieved' })
        })
})
 
// GET | /api/users | Returns an array users.
server.get('/api/users', (req, res) => {
    User.find()
        .then(users => {
            res.status(200).json(users)
        })
        .catch(err => {
            res.status(500).json({ message: 'The users information could not be retrieved' })
        })
})
 
// DELETE | /api/users/:id | Removes the user with the specified `id` and returns the deleted user.
server.delete('/api/users/:id', (req, res) => {
    const { id } = req.params
    User.remove(id)
        .then(deletedUser => {
            const [ status, json ] = deletedUser 
                ? [201, deletedUser] 
                : [404, { message: 'The user with the specified ID does not exist' }]
            res.status(status).json(json)
        })
        .catch(err => {
            res.status(500).json({ message: 'The user could not be removed' })
        })
})
 
// PUT | /api/users/:id | Updates the user with the specified `id` using data from the `request body`. Returns the modified user
server.put('/api/users/:id', (req, res) => {
    const { id } = req.params
    const changes = req.body
    if (!changes.name || !changes.bio) {
        res.status(400).json({ message: 'Please provide name and bio for the user' })
    }
    else {
        User.update(id, changes)
            .then(updatedUser => {
                const [ status, json ] = updatedUser 
                    ? [200, updatedUser] 
                    : [404, { message: 'The user with the specified ID does not exist' }]
                res.status(status).json(json)
            })
            .catch(err => {
                res.status(500).json({ message: 'The user information could not be modified' })
            })
    }
})


// Exports
module.exports = server; // EXPORT YOUR SERVER instead of {}
 