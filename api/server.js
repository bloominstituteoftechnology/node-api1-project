// BUILD YOUR SERVER HERE
// imports
const express = require('express')

const { find, findById, insert, update, remove } = require('./users/model')

// creating express app
const server = express()

//global middleware
server.use(express.json())

//endpoints
//Returns the user object with the specified `id`
server.get('/api/users/:id', (req, res) => {
    const id = req.params.id
    findById(id)
        .then(user => {
            console.log('we are getting -->', user)
            if(!user) {
                res.status(404).json({ message: "The user with the specified ID does not exist" })
            } else {
                res.json(user)
            }
        })
        .catch(() => {
            res.status(500).json({ message: "The users information could not be retrieved" })
        })
})

//Returns an array users
server.get('/api/users', (req, res) => {
    find()
    .then(users => {
        console.log(users)
        res.status(200).json(users)
    })
    .catch(() => {
        res.status(500).json({ message: "The users information could not be retrieved" })
    })
})

//Creates a user using the information sent inside the `request body`
server.post('/api/users', (req, res) => {
    const newUser = req.body

    if(!newUser.name || !newUser.bio) {
        res.status(400).json({ message: "Please provide name and bio for the user" })
    } else {
        insert(newUser)
            .then(user => {
                res.status(201).json(user)
            })
            .catch(() => {
                res.status(500).json({ message: "There was an error while saving the user to the database" })
            })
    }
})

//Updates the user with the specified `id` using data from the `request body`. Returns the modified user
server.put('/api/users/:id', async (req, res) => {
    const { id } = req.params
    const changes = req.body

    try{
        if(!changes.name || changes.bio) {
            res.status(400).json({ message: "Please provide name and bio for the user" })
        } else {
            const updateUser = await update(id, changes)
            if(!updateUser) {
                res.status(404).json({ message: "The user with the specified ID does not exist" })
            } else {
                res.status(200).json(updateUser)
            }
        }
    } catch {
        res.status(500).json({ message: "The user information could not be modified" })
    }
})

//Removes the user with the specified `id` and returns the deleted user
server.remove('/api/users/:id', async (req, res) => {
    try{
        const deleted = await remove(req.params.id)
        if(!deleted) {
            res.status(404).json({ message: "The user with the specified ID does not exist" })
        } else {
            res.json(deleted)
        }
    } catch {
        res.status(500).json({ message: "The user could not be removed" })
    }
});

module.exports = server; // EXPORT YOUR SERVER instead of {}
