const express = require('express')
const db = require('./database.js')

//creates a new express server
const server = express()

server.use(express.json())

server.get('/api/users', (req, res) => {
    try {
        res.json(db.getUsers())
    } catch(err) {
        res.status(500).json({ errorMessage: "The users information could not be retrieved"})
    }
})

server.get('/api/users/:id', (req, res) => {
    try {
        const user = db.getUserById(req.params.id)
        if (user) {
            res.json(user)
        } else { res.status(404).json({
            message: "The user with the specified ID does not exist." })
        }
    } catch(err) {
        res.status(500).json({ errorMessage: "The user information could not be retrieved." })
    } 
})

server.post('/api/users', (req, res) => {
    try {
        if (!req.body.name || !req.body.bio) {
            return res.status(400).json({ errorMessage: "Please provide name and bio for the user."})
        } else {
            const newUser = db.createUser({
                name: req.body.name,
                bio: req.body.bio
            })
            res.status(201).json(newUser)
        }
    } catch(err) {
        res.status(500).json({ errorMessage: "There was an error while saving the user to the database" })
    }
})

server.put("/api/users/:id", (req, res) => {
    try {
        const user = db.getUserById(req.params.id)

        if (!req.body.name || !req.body.bio) {
            return res.status(400).json({ errorMessage: "Please provide name and bio for the user."})
        } else if (!user) {
            res.status(400).json({message: "The user with the specified ID does not exist."})
        } else {
            db.updateUser(req.params.id, {
                name: req.body.name,
                bio: req.body.bio
            })
            res.status(201).json({
                id: user.id,
                name: req.body.name,
                bio: req.body.bio
            })
        }
    } catch(err) {
        res.status(500).json({ errorMessage: "There was an error while saving the user to the database" })
    }
})

server.delete("/api/users/:id", (req, res) => {
    try{
        const user = db.getUserById(req.params.id)

        if (user) {
            db.deleteUser(req.params.id)
            res.status(204).json({ message: "The user was successfully deleted" })
        } else {
            res.status(404).json({ message: "The user with the specified ID does not exist." })
        }
    } catch(err) {
        res.status(500).json({ errorMessage: "The user could not be removed" })
    }
})

server.listen(8080, () => {
    console.log('server started on port 8080')
})