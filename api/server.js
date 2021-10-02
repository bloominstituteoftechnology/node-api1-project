// BUILD YOUR SERVER HERE

// Imports 
const express = require("express")
const User = require('./users/model')

const server = express()

server.use(express.json())

// console.log(User.findById(1))

server.get("/api/users", (req, res) => {
    User.find()
        .then(users => {
            console.log(users)
            res.status(200).json(users)
        })
        .catch(err => {
            res.status(500).json({ message: err.message })
        })
})

server.get("/api/users/:id", (req, res) => {
    const id = req.params.id
    User.findById(id)
        .then(user => {
            if (!user) {
                res.status(404).json(`No User with the ID of: ${id}`)
            }
            else {
                res.json(user)
            }
        })
        .catch(err => res.status(500).json({ message: err.message }))
})

server.post("/api/users", (req, res) => {
    const newUser = req.body
    if (!newUser.name || !newUser.bio) {
        res.status(400).json("Please provide name and bio for the user")
    }
    else {
        User.insert(newUser)
            .then(user => {
                res.status(201).json(user)
            })
            .catch(err => {
                res.status(500).json({ message: "There was an error while saving the user to the database" })
            })
    }

})

server.put("/api/users/:id", async (req, res) => {
    const changes = req.body
    const { id } = req.params
    try {
        if (!changes.name || !changes.bio) {
            res.status(422).json('Please provide new name and bio')
        }
        else {
            const updatedUser = await User.update(id, changes)
            if (!updatedUser) {
                res.status(500).json("User doesn't exist")
            } else {
                res.status(200).json(updatedUser)
            }
        }
    }
    catch (err) {
        res.status(500).json({ message: err.message })
    }

})

// [GET] / (Hello World endpoint)

server.delete("/api/users/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const deletedUser = await User.remove(id);
        if (!deletedUser) {
            res.status(404).json('User doesnt exist')
        }
        else {
            res.status(201).json(deletedUser)
        }
    }
    catch (err) {
        res.status(500).json({ message: err.message })
    }
})


// server.use("*", (req, res) => {
//     res.status(404).json({ message: "404 Not Found" })
// })


module.exports = server; // EXPORT YOUR SERVER instead of {}
