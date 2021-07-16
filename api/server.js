/* eslint-disable no-unused-vars */

const express = require('express');
const server = express(); 
const User = require('./users/model')


server.get('/api/users', (req, res) => {
    User.find()
    .then(users => {
    res.status(200).json(users)
})
    .catch(error => {
    res.status(500).json({
        message: "The users information could not be retrieved"
})
})})


server.post('/api/users', (req, res) => {
    if (!req.body.name || !req.body.bio) {
    res.status(400).json({
    message: "Please provide name and bio for the user"
})
} else {
    const { name, bio } = req.body
    User.insert({ name, bio })
    .then(user => {
        res.status(201).json(user)
    })
    .catch(error => {
        res.status(500).json({
            message: "There was an error while saving the user to the database",
})
})}})


server.get('/api/users/:id', (req, res) => {
    const id = req.params.id
    User.findById(id)
    .then(user => {
    if (!user) {
        res.status(404).json({
            message: "The user with the specified ID does not exist"
})
} else {
        res.status(200).json(user)
}
})
.catch(error => {
    res.status(500).json({
        message: error.message
})
})})

server.delete('/api/users/:id', (req, res) => {
    const id = req.params.id
    User.remove(id)
    .then(user => {
    if (!user) {
        res.status(404).json({
            message: "The user with the specified ID does not exist"
        })
    } else {
        res.status(201).json(user)
    }
})
.catch(error => {
    res.status(500).json({
        message: "The user could not be removed"
})
})})

    server.put('/api/users/:id', (req, res) => {
        const { id } = req.params
        const { name, bio } = req.body
    if (!name || !bio) {
        
    res.status(400).json({
    message: "Please provide name and bio for the user"
})
} else {
    User.update(id, { name, bio })
    .then(updated => {
        if (!updated) {
            res.status(404).json({
                message: "The user with the specified ID does not exist"
})
} else {
            res.json(updated)
}})
    .catch(error => {
        res.status(500).json({
            message: "The user information could not be modified"
})
})
}})

module.exports = server; // EXPORT YOUR SERVER instead of {}
