const express = require("express")
const db = require("./users/model")

const server = express()

server.use(express.json())

server.get("/api/users", async (req, res) => {
    await db.find()
        .then((users) => {
            if(users){
                res.json(users)
            }
        })
        .catch(() => {
            res.status(500).json({
                message: "The users information could not be retrieved"
            }) 
        })
})

server.get("/api/users/:id", async (req, res) => {
    await db.findById(req.params.id)
        .then((user) => {
            if(user) {
                res.json(user)
            }
        })
        .catch((user) => {
            if(!user.id) {
                res.status(404).json({
                    message: "The user with the specified ID does not exist"
                })
            } else {
                res.status(500).json({
                    message: "The user information could not be retrieved"
                })
            }
        })
})

server.post("/api/users", async (req, res) => {
    const newUser = {
        name: req.body.name,
        bio: req.body.bio
    }

    await db.insert(newUser)
        .then((user) => {
            if(user) {
                res.json(user)
                res.status(201).end()
            }
        })
        .catch((user) => {
            if(!user.name || !user.bio){
                res.status(400).json({
                    message: "Please provide name and bio for the user"
                })
            } else if(!user.name || !user.bio){
                res.status(400).json({
                    message: "Please provide name and bio for the user"
                })
            } else {
                res.status(500).json({
                    message: "There was an error while saving the user to the database"
                })
            }
        })
})

server.delete("/api/users/:id", (req, res) => {
    db.findById(req.params.id)
        .then((user) => {
            if (user) {
                db.remove(user.id)
                res.status(204).end()
            }
        })
        .catch((user) => {
            if(!user.id){
                res.status(404).json({
                    message: "The user with the specified ID does not exist"
                })
            } else {
                res.status(500).json({
                    message: "The user could not be removed"
                })
            }
        })
})

server.put("/api/users/:id", async (req, res) => {
    await db.findById(req.params.id)
        .then((user) => {
            if(user) {
                const updatedUser = db.update(user.id, {
                    // use a fallback value so we don't accidentally set it to empty
                    name: req.body.name || user.name,
                    bio: req.body.bio || user.bio
                })
                res.json(updatedUser)
                res.status(200).end()
            }
        })
        .catch((user) => {
            if(!user.id){
                res.status(404).json({
                    message: "The user with the specified ID does not exist"
                })
            } else if(!user.name || !user.bio){
                res.status(400).json({
                    message: "Please provide name and bio for the user"
                })
            } else {
                res.status(500).json({
                    message: "The user information could not be modified"
                })
            }
        })
})

module.exports = server
