const express = require("express")

const db = require("./database")

const server = express()

server.use(express.json())

server.get("/", (req,res) => {
    res.json({ message: "Hello, World"})
})

server.get("/users", (req, res) => {
    const users = db.getUsers()
    res.json(users)
})

server.get("/users/:id", (req, res) => {
    const id = req.params.id

    const user = db.getUserById(id)

    if(user) {
        res.json(user)
    }else {
        res.status(404).json({ message: "User not found, please try the search again"})
    }
})

server.post("/users", (req, res) => {
    const newUser = db.createUser({
        name: req.body.name,
    })

    res.status(201).json(newUser)
})

server.delete("/users/:id", (req,res) => {
    const user = db.getUserById(req.params.id)

    if(user) {
        db.deleteUser(req.params.id)
        res.status(204).end
    }else {
        res.status(404).json({
            message: "User not found"
        })
    }
})

server.listen(5000, () => {
    console.log("Server is listening on port 5000")
})