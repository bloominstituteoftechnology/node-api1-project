// BUILD YOUR SERVER HERE
const express = require("express")
const Users = require("./users/model")

const server = express()

server.use(express.json())

server.post("/api/users", (req, res) => {
    const newUser = req.body

    if (!newUser.name || !newUser.bio) {
        res.status(400).json({ message: "Please provide name and bio for the user" })
    } else {
        Users.insert(newUser)
            .then(users => {
                console.log(users);
                res.status(201).json(users);
            }).catch(() => {
                res.status(500).json({ message: "There was an error while saving the user to the database" })
            })
    }

});

server.put("/api/users/:id", (req, res) => {
    const { id } = req.params
    const body = req.body


    if (!body.name || !body.bio) {
        res.status(400).json({ message: "Please provide name and bio for the user" })
    } else {
        Users.update(id, body)
            .then(user => {
                console.log(user);
                res.status(200).json(user);
            }).catch(() => {
                res.status(404).json({ message: "The user with the specified ID does not exist" })
            })
    }

});

server.get("/api/users/:id", (req, res) => {
    const { id } = req.params
    Users.findById(id)
        .then(user => {
            if (!user) {
                res.status(404).json({ message: "The user with the specified ID does not exist" })
            } else {
                console.log(user);
                res.status(200).json(user);
            }
        }).catch((err) => {
            res.status(500).json(err.message)
        })
})

server.get("/api/users", (req, res) => {
    Users.find()
        .then(users => {
            console.log(users);
            res.status(200).json(users);
        }).catch(() => {
            res.status(500).json({ message: "The users information could not be retrieved" })
        })
})

server.delete("/api/users/:id", (req, res) => {
    const { id } = req.params
    Users.remove(id)
        .then(users => {
            console.log(users);
            res.status(200).json(users);
        }).catch(() => {
            res.status(404).json({ message: "The user with the specified ID does not exist" })
        })
})


server.use("*", (req, res) => {
    res.status(404).json({ message: "Path not found" })
})



module.exports = server; // EXPORT YOUR SERVER instead of {}
