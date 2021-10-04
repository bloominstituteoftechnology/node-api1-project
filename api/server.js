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
            res.status(500).json({ message: "The users information could not be retrieved"})
        })
})

// [GET] /api/users/:id (R of CRUD, fetch users by :id)
server.get("/api/dogs/:id", (req, res) => {
    const idVar = req.params.id
    Users.findById(idVar)
        .then(user => {
            if(!user){
                res.status(400).json({ message: "The user with the specified ID does not exist"})
            }else{
                res.json(user)
            }
        })
        .catch(err => {
            res.status(500).json({ message: "The user information could not be retrieved"})
        })
})

// [POST] /api/users  (C of CRUD, creates a user using information sent inside the request body)
server.post("/api/users", (req, res) => {
    const newUser = req.body
    if(!newUser.name || !newUser.bio){
        res.status(400).json({ message: "Please provide name and bio for the user" })
    }else{
        Users.insert(newUser)
        .then(user => {
            res.json(user)
            res.status(201)
        })
        .catch(err => {
            res.status(500).json({ message: "There was an error while saving the user to the database"})
        })
    }
})

// universal endpoint
server.use("*", (req, res) => {
    res.status(404).json({message:"404 Not Found"})
})
module.exports = server // EXPORT YOUR SERVER instead of {}
