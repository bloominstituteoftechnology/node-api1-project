// BUILD YOUR SERVER HERE


// IMPORTS AT THE TOP
const express = require('express')
const User = require('./users/model')

// INSTANCE OF EXPRESS APP
const server = express()

// GLOBAL MIDDLEWARE
server.use(express.json())

// ENDPOINTS

server.get('/api/users', (req, res) => {
  User.find()
    .then( users => {
      res.json(users).res.statu(200)
    })
    .catch( err => {
      res.status(500).json({
        message: 'The users information could not be retrieved',
        error: err.message,
      })
    })
})

// [GET] /api/users/:id 
server.get('/api/users/:id', (req, res) => {
  User.findById(req.params.id)
    .then( user => {
      if (!user) {
        res.status(404).json({
          message: `The user with the specified ID does not exist`
        })
      } else {
        res.json(user).res.status(200)
      }
    })
    .catch( err => {
      res.status(500).json({
        message: 'The user information could does not retrieve ID',
        error: err.message,
      })
    })
})

server.put('/api/users/:id', (req, res) => {
    const { body, } = req
    const { id } = req.params
  
    User.update(id, body)
      .then( updated => {
        if (!updated) {
          res.status(404).json({
            message: 'The user with the specified ID does not exist'
          })
        } else {
          if (!body.name || !body.bio) {
            res.status(400).json({
              message: 'Please provide name and bio for the user'
            })
          } else {
            res.status(200).json(updated)
          }
        }
      })
      .catch( err => {
        res.status(500).json({
          message: 'The user information could not be modified',
          error: err.message,
        })
      })
  })

server.post('/api/users', (req, res) => {
  User.insert(req.body)
    .then( user => {
      if (!req.body.name || !req.body.bio) {
        res.status(400).json({
          message: 'Please provide name and bio for the user'
        })
      } else {
        res.status(201).json(user)
      }
    })
    .catch( err => {
      res.status(500).json({
        message: 'There was an error while saving the user to the database',
        error: err.message,
      })
    })
})

// [DELETE] /api/users/:id - deletes an existing user
server.delete('/api/users/:id', (req, res) => {
  User.remove(req.params.id)
    .then( deletedUser => {
      if (!deletedUser) {
        res.status(404).json({
          message: 'The user with the specified ID does not exist',
        })
      } else {
        res.json(deletedUser)
      }
    })
    .catch( err => {
      res.status(500).json({
        message: 'The user could not be removed',
        error: err.message,
      })
    })
})

// [PUT] /api/users/:id - updates an existing user


module.exports = server; // EXPORT YOUR SERVER instead of {}