// BUILD YOUR SERVER HERE
const express = require('express');
const User = require('../api/users/model');
const server = express();

server.use(express.json());

server.get('/api/users', (req, res) => {
    User.find()
    .then(users => {
        res.status(200).json(users)
    })
    .catch(error => {
        res.status(500).json({ message: error.message})
    }) 
})

server.get('/api/users/:id', (req, res) => {
    const id  = req.params.id;
    User.findById(id)
    .then(user => {
        if(!user){
            res.status(404).json('user does not exist')
        } else {
            res.status(200).json(user)
        }
    })
    .catch(error => {
        res.status(500).json({ message: error.message })
    })
})

server.post('/api/users', (req, res) => {
    const newUser = req.body
    if(!newUser.name || !newUser.bio) {
        res.status(422).json("Please provide name and bio")
    } else {
        User.insert(newUser)
        .then(user => {
            res.status(201).json(user)
        })
        .catch(error => {
            res.status(500).json({ message: error.message })
        })
    }
})

server.put("/api/users/:id", async (req, res) => {
    const { id } = req.params
    const changes = req.body
    try {
        if(!changes.name || !changes.bio) {
            res.status(422).json('Please provide name and bio')
        } else {
            const updatedUser = await User.update(id, changes)
            if(!updatedUser){
                res.status(404).json('User does not exist')
            } else {
                res.status(200).json(updatedUser)
            }
        }
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})

server.delete("/api/users/:id", async (req, res) => {
    try {
        const { id } = req.params
        const deletedUser = await User.remove(id)
        if(!deletedUser){
            res.status(404).json("User could not be found")
        } else {
            res.status(200).json(deletedUser)
        }
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})



module.exports = server; // EXPORT YOUR SERVER instead of {}
