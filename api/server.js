const express = require('express');
const User = require('./users/model.js')
const server = express();
server.use(express.json())

server.get('/', (req, res) => {
    // console.log(`this is a ${req.method} request`);
    res.status(200).json({ message: 'Sanity Test. You Are Sane!!' })
})

server.get('/api/users', async (req, res) => {
    try {
        const users = await User.find()
        res.json(users)
    } catch (err) {
        res.status(500).json({ message: "The users information could not be retrieved" })
    }
})

server.get('/api/users/:id', (req, res) => {
    // res.status(200).json({ message: 'user/:id working!!' })
    console.log('this is the id', req.params.id)
    User.findById(req.params.id)
        .then(user => {
            // console.log(user)
            if (user) {
                res.status(200).json(user)
            } else {
                // console.log('index.js ln:27 ALERT')
                res.status(404).json({ message: "The user with the specified ID does not exist" })
            }
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({ message: "The user information could not be retrieved" })
        })
})

server.post('/api/users', async (req, res) => {
    try {
        const { name, bio } = req.body
        if (!name || !bio) {
            res.status(400).json(
                { message: "Please provide name and bio for the user" }
            )
        } else {
            const newUser = await User.insert({ name, bio })
            // console.log(newUser);
            res.status(201).json(newUser)
        }
    } catch (err) {
        res.status(500).json({ message: "There was an error while saving the user to the database" })
    }

})

server.put('/api/users/:id', async (req, res) => {
    try {
        const { name, bio } = req.body
        const { id } = req.params
        if (!name || !bio) {
            res.status(400).json({ message: "Please provide name and bio for the user" })
        } else {
            const updateUser = await User.update(id, { name, bio })
            if (updateUser === null) {
                res.status(404).json({ message: "The user with the specified ID does not exist" })
            } else {
                // console.log(updateUser)
                res.json(updateUser)
            }
        }
    } catch (err) {
        res.status(500).json({
            message: err.message,
            customMessage: 'something went wrong'
        })
    }
})



    server.delete('/api/users/:id', async (req, res) => {
        // res.json({ message: `DELETE user with id ${req.params.id}` })
        try {
            const deleteUser = await User.remove(req.params.id)
            // console.log(deleteUser);
            if (!deleteUser) {
                res.status(404).json({ message: "The user with the specified ID does not exist" })
            } else {
                res.json(deleteUser)
            }
        } catch (err) {
            res.status(500).json({ message: "Please provide name and bio for the user" })
        }
    })

    module.exports = server;
