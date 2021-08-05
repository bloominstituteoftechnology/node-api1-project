// BUILD YOUR SERVER HERE
const express = require("express")
const User = require("./users/model.js")

const server = express()
server.use(express.json())

// [POST] (C of CRUD, create new dog from JSON payload)
server.post("/api/users", (req, res) => {
    const newUser = req.body
    if (!newUser.name || !newUser.bio) {
        res.status(400).json({ message: "Please provide name and bio for the user" })
    } else {
        User.insert(newUser)
        console.log(newUser)
            .then(user => {
                res.status(201).json(user)
            })
            .catch(err => {
                res.status(500).json({ message: "There was an error while saving the user to the database" })
            })
    }
})

// [GET] (R of CRUD, fetch all dogs)
server.get("/api/users", (req, res) => {
    User.find()
        .then(users => {
            console.log(users)
            res.status(200).json(users)
        })
        .catch(err => {
            res.status(500).json({ message: "The users information could not be retrieved" })
        })
})

// [GET] (R of CRUD, fetch dog by :id)
server.get("/api/users/:id", (req, res) => {
    const idVar = req.params.id
    User.findById(idVar)
        .then(user => {
            if (!user) {
                res.status(404).json({ message: "The user with the specified ID does not exist" })
            } else {
                res.json(user)
            }
        })
        .catch(err => {
            res.status(500).json({ message: "The user information could not be retrieved" })
        })
})
// [DELETE] (D of CRUD, remove dog with :id)
server.delete("/api/users/:id", async (req, res) => {
    try {
        const { id } = req.params
        const delereUser = await User.delete(id)
        if (!deleteUser) {
            res.status(404).json({ message: "The user with the specified ID does not exist" })
        } else {
            res.status(201).json(deleteUser)
        }
    } catch (err) {
        res.status(500).json({ message: "The user could not be removed" })
    }
})

// [PUT] (U of CRUD, update dog with :id using JSON payload)
server.put("/api/users/:id", async (req, res) => {
    const { id } = req.params
    const changes = req.body
    try {
        if (!changes.name || !changes.bio) {
            res.status(400).json({ message: "Please provide name and bio for the user" })
        } else {
            const updatedUser = await User.update(id, changes)
            if (!updatedUser) {
                res.status(500).json("The user information could not be modified" )
            } else {
                res.status(200).json(updatedUser)
            }
        }
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
})

module.exports = server; // EXPORT YOUR SERVER instead of {}
