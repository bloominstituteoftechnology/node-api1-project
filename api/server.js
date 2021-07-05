// BUILD YOUR SERVER HERE
const express = require('express')
const User = require('./users/model')
const server = express()

server.use(express.json())

// ENDPOINTS

// [GET] /api/users -> fetch all users
server.get('/api/users', (req, res) => {
    User.find()
        .then(users => {
            res.status(200).json(users)
        })
        .catch(err => {
            res.status(500).json({
                message: "The users information could not be retrieved"
            })
        })
})

// [GET] /api/users/:id -> fetch specified user by id
server.get('/api/users/:id', (req, res) => {
    const id = req.params.id
    User.findById(id)
        .then(user => {
            if (!user) {
                res.status(404).json({
                    message: "The user with the specified ID does not exist"
                })
            } else {
                res.status(200).json(user)
            }
        })
        .catch(err => {
            res.status(500).json({
                message: err.message
            })
        })
 })

// [POST] /api/users -> 
server.post('/api/users', (req, res) => {
    // console.log("hitting POST request")
    if (!req.body.name || !req.body.bio) {
        res.status(400).json({
            message: "Please provide name and bio for the user"
        })
    } else {
        const { name, bio } = req.body
        User.insert({ name, bio })
            .then(user => {
                res.status(201).json(user)
            })
            .catch(err => {
                res.status(500).json({
                    message: "There was an error while saving the user to the database"
                })
            })
    }
})

// [PUT]

// [DELETE]



module.exports = server; // EXPORT YOUR SERVER instead of {}
