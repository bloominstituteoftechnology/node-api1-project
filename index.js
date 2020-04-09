const express = require("express");
const db = require("./database")

const server = express();

server.use(express.json())

server.get("/", (req, res) => {
    res.json({message: "hello world"})
})

server.get("/users", (req, res) => {
    const users = db.getUsers();
    res.json(users);
})

server.get("/users/:id", (req, res) => {
    const user = db.getUserById(req.params.id)
    if (user) {
        res.json(user)
    } else {
        res.status(404).json({ message: "The user with the specified ID does not exist." })
    }
})

server.post("/users", (req, res) => {
    if (!req.body.name || !req.body.bio) {
        res.status(400).json({ errorMessage: "Please provide name and bio for the user." })
    } 
    
    const newUser = db.createUser({
        name: req.body.name,
        bio: req.body.bio
    })

    res.status(201).json(newUser)
})

server.delete("/users/:id", (req, res) => {
    const user = db.getUserById(req.params.id)
    if (user) {
        db.deleteUser(user.id)

        res.status(204).end()
    } else {
        res.status(404).json({ message: "The user with the specified ID does not exist." })
    }
})

server.put("/users/:id", (req, res) => {
    const user = db.getUserById(req.params.id)
    if (!user) {
        res.status(404).json({ message: "The user with the specified ID does not exist." })
    } else if (!req.body.name || !req.body.bio) {
        res.status(400).json({ errorMessage: "Please provide name and bio for the user." })
    } else {
        const updatedUser = db.updateUser(user.id, {
            name: req.body.name,
            bio: req.body.bio
        })

        res.json(updatedUser)
    }
})

server.listen(5000, () => {
    console.log("server started on port 5000")
})