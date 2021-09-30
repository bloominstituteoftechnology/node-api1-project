// BUILD YOUR SERVER HERE
const express = require("express")
const User = require("./users/model")

const server = express()

server.use(express.json())

server.get("/api/users", (req, res) => {
    User.find()
        .then(users => {
            console.log(users)
            res.status(200).json(users)
        })
        .catch(err=>{
            res.status(500).json({message: "There was an error while saving the user to the database"})
        })
})

server.get("/api/users/:id", (req,res)=>{
    const userId = req.params.id
    User.findById(userId)
        .then(user => {
            if(!user){
                res.status(404).json({message: "The user with the specified ID does not exist"})
            } else {
                res.json(user)
            }            
        })
        .catch(err=>{
            res.status(500).json({message: "The user information could not be retrieved" })
        })
})

server.post("/api/users", (req, res) => {
    const newUser = req.body
    if(!newUser.name || !newUser.bio){
        res.status(400).json("Please provide name and bio for the user")
    } else {
        User.insert(newUser)
            .then(user => {
                res.status(201).json("success")
                res.json(user)
            })
            .catch(err=>{
                res.status(500).json({message: "There was an error while saving the user to the database"})
            })
    }
})

server.put("/api/users/:id", async (req, res) => {
    const {id} = req.params
    const changes =req.body
    try{
        if(!changes.name || !changes.bio){
            res.status(400).json({ message: "Please provide name and bio for the user" })
        } else {
            const updatedUser = await User.update(id, changes)
            if(!updatedUser) {
                res.status(404).json({message: "The user with the specified ID does not exist"})
            } else {
                res.status(201).json(updatedUser)
            }
        }
    }
    catch(err){
        res.status(500).json({ message: "The user information could not be modified" })
    }
})

server.delete("/api/users/:id", (req, res) => {
    const {id} = req.params
    User.remove(id)
        .then(user => {
            if(!user) {
                res.status(404).json({message: "The user with the specified ID does not exist" })
            } else {
                res.status(201).json(user)
            }
        })
        .catch(err=>{
            res.status(500).json({message: "The user could not be removed"})
        })
})

server.use('*', (req, res) => {
    res.status(404).json({message: "404 not found"})
})

module.exports = server; // EXPORT YOUR SERVER instead of {}
