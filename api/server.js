const express = require('express')
const User = require('./users/model')

const server = express()

server.use(express.json())

// GET ALL USERS
server.get('/api/users', (req, res) => {
    User.find()
    .then((users) => {
        res.json(users)
    })
    .catch((err) => {
        res.status(500).json({
            message: "The users information could not be retrieved",
            error: err.message
        })
    })
})

//GET USER BY ID

server.get('/api/users/:id', async (req, res) => {
    User.findById()
    try {
        const { id } = req.params
        const user = await User.findById(id)
        if (!user) {
            res.status(404).json({ message: "The user with the specified ID does not exist" })
        } else {
            res.status(200).json(user)
        }
    } catch (err) {
        res.status(500).json({
            message: "The user information could not be retrieved",
            error: err.message
        })
    }
})

module.exports = server
