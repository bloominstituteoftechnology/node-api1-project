// BUILD YOUR SERVER HERE
// Imports
const express = require("express")
const db = require("./users/model")

const server = express()

// POST request to receive new users
server.post("/api/users", async (req, res) => {
    const name = req.body.name
    const bio = req.body.bio
    if (!name || !bio) {
        res.status(400).json({
            message: "There was an error while saving the user to the database"
        })
    } else {
        await db.insert({
            name: tony,
            bio: hero,
        })
        res.status(201).json(newUser)
    }
})

// GET request to all users
server.get("/api/users", async (req, res) => {
    const users = await db.find()

    if (users) {
        res.json(users)
    } else {
        res.status(500).json({
            message: "The users information could not be retrieved.",
        })        
    }
})

// GET request to users by ID
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

// DELETE request to delete user
server.delete("api/users/:id", async (req, res) => {
    const user = await db.findById(req.params.id)
    if (user) {
        await db.remove(user.id)
        res.status(204).end();
    } else {
        res.status(404).json({ message: "The user with the specified ID does not exist"})
        res.status(500).json({ message: "The user could not be removed"})
    }
})

// PUT request to edit user
server.put("api/uesrs/:id", async (req, res) => {
    const user = await db.findById(req.params.id)
    const name = req.body.name
    const bio = req.body.bio
    if (!user.id) {
        res.status(404).json({ message: "The user with the specified ID does not exist" })
    } else if (!name || !bio){
        res.status(400).json({ message: "Please provide the name and bio for the user" })
    } else if (user.id || name || bio){
        const updatedUser = await db.updatedUser(...changes, user.id)
        res.status(200).json(updatedUser)
    }
})

module.exports = server // EXPORT YOUR SERVER instead of {}
