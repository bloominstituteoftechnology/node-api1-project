// BUILD YOUR SERVER HERE
const express = require('express');
const Users = require('./users/model')
const server = express()

server.use(express.json())


server.post('/api/users', (req, res) => {
    const user = req.body
    if (!user.name || !user.bio) {
        res.status(400).json({
            message: '/provide name and bio/'
        })
    } else {
        Users.insert(user)
            .then((nUser) => {
                res.status(201).json(nUser)
            })
            .catch(err => {
                res.status(500).json({
                    message: "error creating user",
                    err: err.message
                })
            })
    }

})


server.get('/api/users', (req, res) => {
    Users.find()
        .then(users => {
            res.json(users)
        })
        .catch(err => {
            res.status(500).json({
                message: 'Error retrieving users' + err.message

            })
        })
})


server.get('/api/users/:id', (req, res) => {
    Users.findById(req.params.id)
        .then(users => {
            if (!users) {
                res.status(404).json({
                    message: "/does not exist/"
                })
            }
            res.json(users)
        })
        .catch(err => {
            res.status(500).json({
                message: 'Error retrieving user: ' + err.message
            })
        })
})


server.put('/api/users/:id', (req, res) => {
    const user = req.body
    if (!user.id) {
        res.status(400).json({
            message: "Please provide name and bio for the user"
        })
    } else {
        Users.update(user)
            .then((user) => {
                res.status(200).json(user)
            })
            .catch(err => {
                res.status(500).json({
                    message: "error creating user",
                    err: err.message
                })
            })
    }
})

server.delete('/api/users/:id', (req, res) => {
    const user = req.body
    if (!user.id) {
        res.status(404).json({
            message: "The user with the specified ID does not exist"
        })
    } else {
        Users.remove(user)
            .then((delUser) => {
                res.status(200).json(delUser)
            })
            .catch(err => {
                res.status(500).json({
                    message: "The user could not be removed",
                    err: err.message
                })
            })
    }
})


server.use('*', (req, res) => {
    res.status(404).json({
        message: 'not found'
    })
})



module.exports = server;