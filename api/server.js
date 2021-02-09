const express = require("express")
const http = require("http")
const { getUserById } = require("../api/users/model")
const db = require(".model")

const server = express()

// middleware
server.use(express.json())

server.get("/", (req, res) => {
    res.json({ message: "Hello" })
})

// Get all users
server.get("/users", (req, res) => {
    const users = db.getUsers()

    res.json(users)
})

// Post new user
server.post("/users", (req, res) => {
    const name = req.body.name
    const bio = req.body.bio
    if (!name || !bio) {
        return res.status(400).json({
            message: "Please provide name and bio for the user.",
        })
    }
    const newUser = db.createUser({
        name: req.body.name,
        bio: req.body.bio
    })
    res.status(201).json(newUser)
})

// Get user by ID
server.get("/users/:id", (req, res) => {
    const id = req.params.id
    const user = getUserById(id)

    if (user) {
        res.json(user)
    } else {
        res.status(404).json({
            message: "The user with the specified ID does not exist.."
        })
    }
})

server.delete("/users/:id", (req, res) => {
    const id = req.params.id
    const user = getUserById(id)

    if (user) {
        db.deleteUser(id)
        res.status(204).json({
            message:`User ${id} was deleted.`
        })
    } else {
        res.status(404).json({
            message: "The user with the specified ID does not exist."
        })
    }
})

server.put("/users/:id", (req, res) => {
    const id = req.params.id
    const user = getUserById(id)

    if (user) {
        const updatedUser = db.updateUser(id, {
            name: req.body.name || user.name,
            bio: req.body.bio || user.bio
        })
        res.status(201).json(updatedUser)
    } else {
        res.status(404).json({
            message: "user not found"
        })
    }
})

server.listen(8001, () => {
    console.log('server started')
}) 