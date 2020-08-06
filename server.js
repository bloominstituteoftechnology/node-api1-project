const express = require("express")

const db = require("./database")
const { getUsers, getUserById, createUser, deleteUser } = require("./database")
const e = require("express")

const server = express()
server.use(express.json())

server.get("/", (req, res) => {
    res.json({ message: "Hello, world!" })
})

server.get("/users", (req, res) => {
    const users = db.getUsers()

    if (!users) {
        res.status(500).json("errorMessage: The users information could not be retrieved.")
    } else {
        res.json(users)
    }
})

server.get("/users/:id", (req, res) => {
    const id = req.params.id
    const user = db.getUserById(id)

    if (!user) {
        res.status(404).json({ message: "The user with the specified ID does not exist." })
    } else {
        if (user === null) {
            res.status(500).json("errorMessage: The user information could not be retrieved.")
        }
        res.json(user)
    }
})

server.post("/users/add", (req, res) => {
    const newUser = db.createUser({
        id: req.body.id,
        name: req.body.name,
        bio: req.body.bio
    })

    if (!newUser.name || !newUser.bio) {
        res.status(400).json("errorMessage: Please provide name and bio for the user.");
    } else {
        return;
    }

    if (newUser) {
        res.status(201).json(newUser)
    }
    else {
        res.status(500).json("There was an error while saving the user to the database")
    }

})

server.put('/users/:id', (req, res) => {
    const editUser = getUserById(req.params.id)

    if (!editUser) {
        return res.status(404).json("message: The user with the specified ID does not exist.")
    } else {
        if (req.body.name || req.body.bio === null) {
            return res.status(400).json("errorMessage: Please provide name and bio for the user.")
        }
        else if (res.status(500)) {
            return res.json("errorMessage: The user information could not be modified.")
        }

        editUser.name = req.body.name;
        editUser.bio = req.body.bio;
        res.json(editUser);
    }

})


server.delete("/users/:id", (req, res) => {
    const user = db.getUserById(req.params.id)

    if (!user) {
        res.status(404).json("message: The user with the specified ID does not exist")
        res.status(500).json("errorMessage: The user could not be removed")
    } else {
        db.deleteUser(req.params.id)
        res.status(204).end()
    }
})

server.listen(8000, () => {
    console.log("server started on port")
})