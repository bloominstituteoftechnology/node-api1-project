// BUILD YOUR SERVER HERE
const express = require('express')
const server = express()
const User = require('../api/users/model.js')

server.use(express.json())

//ENDPOINTS 

server.get('/api/users', (req, res) => {
    User.find()
        .then(user => {
            res.status(200).json(user)
        })
        .catch(err => {
        res.status(500).json({message: err.message})
    })
})

server.get('/api/users/:id', (req, res) => {
    const {id} = req.params
    User.findById(id)
        .then(user => {
            if (!user) {
                res.status(404).json(`user ${id} does not exist`)
            } else {
                res.status(200).json(user)
            }
        }).catch(err => {
            res.status(500).json({message: err.message})
        })
    .catch(err => {
        res.status(500).json({message: err.message})
    })
})

server.post('/api/users', (req, res) => {
    const newUser = req.body

    User.insert(newUser)
        .then(user => {
            if (!newUser.name || !newUser.bio) {
            res.status(404).json({message: 'Please provide name and bio for the user'})
            } else {
                res.status(202).json(user)
        }
    })
})

server.delete('/api/users/:id', async (req, res) => {
    const { id } = req.params
    try {
        const deletedUser = await User.remove(id)
        if (!deletedUser) {
            res.status(404).json(`user with id${id} does not exist`)
        } else {
            res.status(201).json(deletedUser)
        }
    } catch {
        res.status(500).json({message: 'unable to delete user'})
    }
})

server.put('/api/users/:id', async (req, res) => {
    const { id } = req.params
    const updatedUser = req.body

    try {
        if (!updatedUser.name || !updatedUser.bio) {
            res.status(404).json({message: 'name and/or bio are required'})
        } else {
            const updatedInfo = await User.update(id, updatedUser)
            if (!updatedInfo) {
                res.status(404).json({message:'the User with the specific id does not exist'})
            } else {
                res.status(200).json(updatedInfo)
            }
        }
    } catch {
        res.status(500).json({message: 'user could not be updated'})
    }
})

module.exports = server; // EXPORT YOUR SERVER instead of {}
