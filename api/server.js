// BUILD YOUR SERVER HERE
// imports
const express = require("express");
const Users = require("./users/model.js")
// instance of express app
const server = express();

// global middleware
server.use(express.json());

// endpoints
// [GET] /api/users (R of CRUD, fetch all users)
server.get("/api/users", (req, res) => {
    Users.find()
        .then(users => {
            console.log(users)
            res.status(200).json(users)
        })
        .catch(err => {
            res.status(500).json({message:"The users information could not be retrieved"})
        })
})

// [GET] /api/users/:id (R of CRUD, fetch users by :id)
server.get("/api/dogs/:id", (req, res) => {
    const idVar = req.params.id
    Users.findById(idVar)
        .then(user => {
            res.json(user)
        })
        .catch(err => {
            res.status(404).json({message:"The user with the specified ID does not exist"})
        })
})

// universal endpoint
server.use("*", (req, res) => {
    res.status(404).json({message:"404 Not Found"})
})
module.exports = server // EXPORT YOUR SERVER instead of {}
