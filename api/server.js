    // BUILD YOUR SERVER HERE
const express = require('express');
const User = require('./users/model');
const server = express();
server.use(express.json());

server.post('/api/users', (req, res) => {
    const user = req.body;
    if (!user.name || !user.bio) {
        res.status(400).json({
            message: 'Please provide name and bio for the user',
        })
    } else {
        User.insert(user)
            .then(newUser => {
                res.status(201).json(newUser)
            })
            .catch(err => {
                res.status(500).json({
                    message: 'There was an error while saving the user to the database',
                    err: err.message,
                    stack: err.stack,
                })
            })
    }
    User.insert(user)
})

server.get('/api/users', (req, res) => {
    User.find()
        .then(users => {
            res.json(users)
        })
        .catch(err => {
            res.status(500).json({
                message: 'The users information could not be retrieved',
                err: err.message,
                stack: err.stack,
            })
        })
})

server.get('/api/users/:id', (req, res) => {
    User.findById(req.params.id)
        .then(user => {
            if (!user) {
                res.status(404).json({
                    message: 'The user with the specified ID does not exist',
                })
            }
            res.json(user)
        })
        .catch(err => {
            res.status(500).json({
                message: 'The user information could not be retrieved',
                err: err.message,
                stack: err.stack,
            })
        })
})

server.delete('/api/users/:id', async (req, res) => {
    try {
        const user = await User.findById(req.params.id)
        if (!user) {
            res.status(404).json({
                message: 'The user with the specified ID does not exist',
            })
        } else {
            const deletedUser = await User.remove(user.id)
            res.status(200).json(deletedUser)
        }    
    } catch (err) {
        res.status(500).json({
            message: 'The user could not be removed',
            err: err.message,
            stack: err.stack,
        })
    }

})

server.put('/api/users/:id', async(req, res) => {
    try {
        const user = await User.findById(req.params.id)
        if (!user) {
            res.status(404).json({
                message: 'The user with the specified ID does not exist',
            })
        } else {
            if (!user.name || !user.bio) {
                res.status(400).json({
                    message: 'Please provide name and bio for the user',
                })
            } else {
                const updatedUser = await User.update(
                    req.params.id,
                    req.body,
                )
                res.status(200).json(updatedUser)
            }
        } 

    } catch (err) {
        res.status(500).json({
            message: 'The user could not be removed',
            err: err.message,
            stack: err.stack,
        })
    }
})

module.exports = server; // EXPORT YOUR SERVER instead of {}
