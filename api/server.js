const express = require('express')
const User = require('./users/model')
const server = express()

server.use(express.json())

server.post('/api/users', (req, res) => {
  const user = req.body
  if (!user.name || !user.bio) {
    res.status(400).json({
      message: 'Please provide name and bio for the user',
    })
  } else {
    User.insert(user)
      .then((newUser) => {
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
})

server.get('/api/users', (req, res) => {
  User.find()
    .then((users) => {
      res.json(users)
    })
    .catch((err) => {
      res.status(500).json({
        message: 'error getting users',
        err: err.message,
        stack: err.stack,
      })
    })
})

server.get('/api/users/:id', (req, res) => {
  User.findById(req.params.id)
    .then((user) => {
      if (!user) {
        res.status(404).json({
          message: 'The user with the specified ID does not exist',
        })
      }
      res.json(user)
    })
    .catch((err) => {
      res.status(500).json({
        message: 'error getting user',
        err: err.message,
        stack: err.stack,
      })
    })
})

server.use('*', (req, res) => {
  res.status(404).json({ message: 'Not found' })
})

module.exports = server
