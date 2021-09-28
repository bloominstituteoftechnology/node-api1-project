// BUILD YOUR SERVER HERE
const express = require('express')
const Users = require('./users/model')

const server = express()

server.use(express.json())

// POST - Creates a user using the information sent inside the request body.
server.post('/api/users', async (req, res) => {
    try {
        const { name, bio } = req.body
        if (!name || !bio) {
            res.status(400).json({
                message: "Please provide name and bio for the user"
            })
        } else {
            const newUser = await Users.insert({ name, bio })
            res.status(201).json(newUser)
        }
    } catch (err) {
        res.status(500).json({
            message: "There was an error while saving the user to the database"
        })
    }
})

// GET - Returns an array users.
server.get('/api/users', async (req, res) => {
    try {
        const users = await Users.find()
        res.status(200).json(users)
    } catch (err) {
        res.status(500).json({
            message: "The users information could not be retrieved"
        })
    }
})

// GET - Returns the user object with the specified id.
server.get('/api/users/:id', async (req, res) => {
    try {
        const { id } = req.params
        const user = await Users.findById(id)
        if (!user) {
            res.status(404).json({
                message: "The user with the specified ID does not exist"
            })
        } else {
            res.status(200).json(user)
        }
    } catch (err) {
        res.status(500).json({
            message: "The user information could not be retrieved"
        })
    }
})

// DELETE - Removes the user with the specified id and returns the deleted user.
server.delete('/api/users/:id', async (req, res) => {
    try {
        const deletedUser = await Users.remove(req.params.id)
        if (!deletedUser) {
            res.status(404).json({
                message: "The user with the specified ID does not exist"
            })
        } else {
            res.status(200).json(deletedUser)
        }
    } catch (err) {
        res.status(500).json({
            message: "The user could not be removed"
        })
    }
})

// PUT - Updates the user with the specified id using data from the request body. 
//       Returns the modified user
server.put('/api/users/:id', async (req, res) => {
    try {
        const { name, bio } = req.body
        const { id } = req.params
        if (!name || !bio) {
            res.status(400).json({
                message: "Please provide name and bio for the user"
            })
        } else {
            const updatedUser = await Users.update(id, { name, bio })
            if (!updatedUser) {
                res.status(404).json({
                    message: "The user with the specified ID does not exist"
                })
            } else {
                res.status(200).json(updatedUser)
            }
        }
    } catch (err) {
        res.status(500).json({
            message: "The user information could not be modified"
        })
    }
})

module.exports = server; // EXPORT YOUR SERVER instead of {}
