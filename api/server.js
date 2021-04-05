// BUILD YOUR SERVER HERE
const express = require('express')
const server = express()
const Users = require('./users/model.js')

//Declaring middleware (does not accept json body without this)
//I assume this declares what language server is expecting in body.
server.use(express.json())

//| POST   | /api/users     | Creates a user using the information sent inside the `request body`.                                   |
server.post("/api/users", (req, res)=>{
    const newUser = req.body
    if (!newUser.name || !newUser.bio){
        res.status(400).json({ message: "Please provide name and bio for the user" })
        return
    }
    Users.insert(newUser)
        .then(confirmation=>{
            res.status(201).json({message:confirmation})
        })
        .catch(error=>{
            console.log(error.message)
            res.status(500).json({ message: "There was an error while saving the user to the database" })
        })
})

//| GET    | /api/users     | Returns an array users.                                                                                |
server.get("/api/users", (req, res)=>{
    Users.find()
        .then(users=>{
            res.status(200).json(users)
        })
        .catch(error=>{
            console.log(error.message)
            res.status(500).json({ message: "The users information could not be retrieved" })
        })
})

//| GET    | /api/users/:id | Returns the user object with the specified `id`.                                                       |
server.get("/api/users/:id", (req, res)=>{
    const {id} = req.params
    Users.findById(id)
        .then(user=>{
            if(!user){
                return res.status(404).json({ message: "The user with the specified ID does not exist" })
            }
            res.status(200).json(user)
        })
        .catch(error=>{
            console.log(error.message)
            res.status(500).json({ message: "The user information could not be retrieved" })
        })
})

//| DELETE | /api/users/:id | Removes the user with the specified `id` and returns the deleted user.                                 |
server.delete("/api/users/:id", (req, res)=>{
    const {id} = req.params
    Users.remove(id)
        .then(user=>{
            if(!user){
                return res.status(404).json({ message: "The user with the specified ID does not exist" })
            }
            res.status(410).json(user)
        })
        .catch(error=>{
            console.log(error.message)
            res.status(500).json({ message: "The user could not be removed" })
        })
})

//| PUT    | /api/users/:id | Updates the user with the specified `id` using data from the `request body`. Returns the modified user |
server.put("/api/users/:id", (req, res)=>{
    const {id} = req.params
    const changes = req.body
    if (!changes.name || !changes.bio){
        return res.status(400).json({ message: "Please provide name and bio for the user" })
    }
    Users.update(id, changes)
        .then(user=>{
            if(!user){
                return res.status(404).json({ message: "The user with the specified ID does not exist" })
            }
            res.status(200).json(user)
        })
        .catch(error=>{
            console.log(error.message)
            res.status(500).json({ message: "The user information could not be modified" })
        })
})

server.use("*",(req, res)=>{
    res.status(404).json({message:"Api endpoint not found."})
})

module.exports = server; // EXPORT YOUR SERVER instead of {}
