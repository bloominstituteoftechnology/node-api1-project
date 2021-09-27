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

module.exports = server; // EXPORT YOUR SERVER instead of {}
