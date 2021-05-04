// BUILD YOUR SERVER HERE
const express = require('express')
const User = require('./users/model.js')

const server = express()

server.use(express.json())




//ENDPPOINTS

// GET /api/users (fetch all users)
server.get('/api/users', (req, res) => {
    User.findAll()
        .then(users => {
            console.log(users)
            res.json(users)
        })
        .catch(err => {
            res.status(500).json({
                message: "The users information could not be retrieved"  
            })
        })
})

// GET /api/users/:id (fetch user by :id)
server.get('/api/users/:id', async (req, res) => {
    try {
        const user = await User.findById(req.params.id)
        
        if (!user) {
            res.status(404).json({
                message: "The user with the specified ID does not exist"
            })
        } else {
            res.json(user)
        }
    } catch (err) {
        res.status(500).json({
            message: "The user information could not be retrieved"
        })
    }
})

// POST /api/users (create new user from JSON payload)
server.post('/api/users', async (req, res) => {
    try {
        const userFromClient = req.body
        if (!userFromClient.name || !userFromClient.bio) {
            res.status(400).json({
                message: "Please provide name and bio for the user"
            })
        } else {
            const newUser = await User.create(userFromClient)
            res.status(201).json(newUser)
        }
    } catch (err) {
        res.status(500).json({
            message: "There was an error while saving the user to the database"
        })
    }
})


//PUT /api/users/:id 
server.put('/api/users/:id', async (req, res) => {
    try {
        if (!req.body.name || !req.body.bio) {
            res.status(400).json({
                message: "Please provide name and bio for the user"
            })
        } else {
            const updatedUser = await User.update(req.params.id, req.body)
            if (!updatedUser) {
                res.status(404).json({
                    message: "The user with the specified ID does not exist"
                })
            } else {
                res.json(updatedUser)
            }
        }
    } catch (err) {
        res.status(500).json({
            message: "The user information could not be modified"
        })
    }
})



// DELETE /api/users/:id
server.delete('/api/users/:id', (req, res) => {
    User.delete(req.params.id)
        .then(deletedUser => {
            if (!deletedUser) {
                res.status(404).json({
                    message: "The user with the specified ID does not exist"
                })
            } else {
                res.json(deletedUser)
            }
        })
        .catch(err => {
            res.status(500).json({
                message: "The user could not be removed"
            })
        })
})

module.exports = server; // EXPORT YOUR SERVER instead of {}
