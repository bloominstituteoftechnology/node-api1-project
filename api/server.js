const express = require('express')
const User = require('./users/model')

const server = express()

server.use(express.json())

server.get('/', (req, res) => {
    res.send('Hello')
})

server.get('/api/users', (req, res) => {
    // console.log('getting users');
    User.find()
        .then(users => {
            res.json(users)
        })
        .catch(err => {
            res.status(500).json({
                message: 'error getting users',
                err: err.message,
                stack: err.stack
            })
        })
})

server.get('/api/users/:id', (req, res) => {
    User.findById(req.params.id)
        .then(user => {
            if (!user) {
                res.status(404).json({
                    message: 'The user with the specified ID does not exist'
                })
            }
            res.json(user)
        })
        .catch(err => {
            res.status(500).json({
                message: 'error getting user',
                err: err.message,
                stack: err.stack
            })
        })
})

server.post('/api/users', (req, res) => {
    const user = req.body
    if (!user.name || !user.bio) {
        res.status(400).json({
            message: 'Please provide name and bio for the use'
        })
    } else {
        User.insert(user)
            .then(newUser => {
                res.status(201).json(newUser)
            })
            .catch(err => {
                res.status(500).json({
                    message: 'error creating user',
                    err: err.message,
                    stack: err.stack
                })
            })
    }
})

server.put('/api/user/:id', async (req, res) => {
    try {
        const possibleUser = await User.findById(req.params.id)
        if (!possibleUser) {
            res.status(404).json({
                message: 'The user with the specified ID does not exist'
            })
        } else {
            if (!req.body.name || req.body.bio) {
                res.status(400).json({
                    message: 'Please provide name and bio for the user'
                })
            } else {
                const updatedUser = await User.insert(req.params.id, req.body)
                res.status(200).json(updatedUser)
            }
        }
    } catch (err) {
        res.status(500).json({
            message: 'error with updated user',
            err: err.message,
            stack: err.stack
        })
    }
})

server.delete('/api/users/:id', async (req, res) => {
    try {
        const possibleUser = await User.findById(req.params.id)
        if (!possibleUser) {
            res.status(404).json({
                message: 'The user with the specified ID does not exist'
            })
        } else {
            const deletedUser = await User.remove(possibleUser.id)
            res.status(200).json(deletedUser)
        }
    } catch (err) {
        res.status(500).json({
            message: 'error deleting users',
            err: err.message,
            stack: err.stack
        })
    }
})

module.exports = server; 