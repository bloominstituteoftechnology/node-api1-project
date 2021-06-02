// BUILD YOUR SERVER HERE
// imports 
const express = require('express')
const User = require('./users/model.js')
// const { find, findByID, users } = require('./users/model.js')

//instance of express app
const server = express()

// global middleware
server.use(express.json())

// ENDPOINTS 
// server.use("*", (req, res) => {
//     res.status(200).json({message: "Hello World!"})
// })

server.get("/api/users", (req, res) => {
    User.find()
    .then(users => {
        console.log(users)
        res.status(200).json(users)
    })
    .catch(err => {
        console.log(err)
        res.status(500).json({message: err.message})
    })
})

server.get("/api/users/:id", (req, res) => {
    const idVar = req.params.id
    User.findById(idVar)
    .then(user => {
        res.json(user)
    })
    .catch(err => {
        res.status(500).json({message: err})
    })
})



 // EXPORT YOUR SERVER instead of {}
 module.exports = server