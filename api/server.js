// BUILD YOUR SERVER HERE

//Imports
const express = require('express')
const Users = require('./users/model.js')

const server = express()

server.use(express.json())

//Post 
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
            message: err.message,
            customMessage: "The users information could not be retrieved"
        })
    }
})

//Get without ID
server.get('/api/users', async (req, res) => {
    try {
        const users = await Users.find()
        res.status(200).json(users)
    } catch (err) {
        res.status(500).json({
            message: err.message,
            customMessage: "The users information could not be retrieved"
        })
    }
})

//Get by ID
server.get('/api/users/:id', async (req, res) => {
    try {
        const { id } = req.params
        const users = await Users.findById(id)
        if (!users) {
            res.status(404).json({
                message: "The user with the specified ID does not exist"
            })
        } else {
            res.status(200).json(users)
        }
    } catch (err) {
        res.status(500).json({
            message: err.message,
            customMessage: "The user information could not be retrieved"
        })
    }
})

//Delete
server.delete('/api/users/:id', async (req, res) => {
    try {
        const deletedUser = await Users.remove(req.params.id)
        if (!deletedUser) {
            res.status(404).json({
                message: `User with id ${req.params.id} does not exist`
            })
        } else {
            res.json(deletedUser)
        }
    } catch (err) {
        res.status(500).json({
            message: err.message,
            customMessage: "The user could not be removed"
        })
    }
})

//Put 
server.put('/api/users/:id', async (req, res) => {
    try {
        const { name, bio } = req.body
        const { id } = req.params
        const user = await Users.findById(id)

        if (!user) {
            res.status(404).json({ message: "The user with the specified ID does not exist" })
        } else if (!name || !bio) {
            res.status(400).json({ message: "Please provide name and bio for the user" })
        } else {
            const updatedUser = await Users.update(id, { name, bio })
            res.status(200).json(updatedUser)
        }
    }
    catch {
        res.status(500).json({
            message: "The user information could not be modified"
        })
    }
})


module.exports = server; // EXPORT YOUR SERVER instead of {}
