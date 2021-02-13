const express = require("express")
const db = require("./users/model")
const server = express()
//This is installing middleware to allow Express to parse incoming JSON request bodies
server.use(express.json())
//server.use(cors())

server.get("/", (req, res) => {
    res.json({
        message: "Hello, World!"
    })
})

server.get("/users", (req, res) => {
    db.find().then(users => {
        res.status(200).json(users)
    }).catch(err => {
        res.status(500).json({
            message: "The user is not found."
        })
    })
})

server.post("/users", (req, res) => {
    const newUser = db.insert({
        name: req.body.name,
        bio: req.body.bio
    })
    if (!name || !bio) {
        res.status(400).json({
            message: "Please provide name and bio for the user"
        })
        .then(user => {
            res.status(200).json(user)
        }).catch(err => {
            res.status(500).json({
                message: "The user information could not be retrieved"
            })
        })
    }
})

server.get("/users", (req, res) => {
    const user = db.find()
    if (user) {
        res.json(user)
    } else {
        res.status(500)
    }
})

server.get("/users/:id", async (req,res) => {
    const users = await db.find()
    if(!req.params.id) {
        res.status(404).json({
            message: "The user with the specified ID does not exist"
        })
    }
    console.log(users)
    db.findById(users[req.params.id -1].id).then(user => {
        console.log(req.params.id)
        res.status(200).json({user})
    }).catch(err => {
        res.status(500).json({
            message: "The user information could not be retrieved"
        })
    })
})

server.delete("/users/:id", async (req, res) => {
    const users = await db.find()
    if(!req.params.id) {
        res.status(404).json({
            message: "The user with the specified ID does not exist"
        })
    }
    db.findById(users[req.params.id -1].id).then(user => {
        res.status(202).json(user)
    }).catch(err => {
        res.status(500).json({
            message: "The user information could not be retrieved"
        })
    })
})

server.put("/users/:id", async (req, res) => {
    const users =  await db.find()
    const updatedUser = db.update(req.body.name, req.body.bio)
    if (!req.params.id) {
        res.status(404).json({
            message: "The user with the specified ID does not exist"
        })
    }
    db.findById(users[req.params.id -1].id).then(user => {
        res.status(200).json(updatedUser)
    }).catch(err => {
        res.status(500).json({
            message: "The user information could not be modified"
        })
    })
})

module.exports = server;