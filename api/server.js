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

//  - respond with HTTP status code `404` (Not Found).
//  - return the following JSON object: `{ message: "The user with the specified ID does not exist" }`.

// [POST]
// server.post('/api/users', (req, res) => {
//     console.log("hitting POST request")
// })

// [PUT]

// [DELETE]



module.exports = server; // EXPORT YOUR SERVER instead of {}
