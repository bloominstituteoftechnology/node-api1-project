// BUILD YOUR SERVER HERE
const express = require('express')
const users = require('./users/model')

const server = express()
server.use(express.json())

server.post('/api/users', (req, res) => {
  const {name, bio} = req.body
  if(!name || !bio)
    return res.status(400).json({ message: "Please provide name and bio for the user" })
  users.insert(req.body)
    .then( newUser => {
      return res.status(201).json(newUser)
    })
    .catch( () => {
      console.log('why are you running????')
      return res.status(500).json({ message: "There was an error while saving the user to the database" })
    })
})

server.get('/api/users', (req, res) => {
  users.find()
    .then( users => {
      return res.status(200).json(users)
    })
    .catch( () => {
      return res.status(500).json({ message: "The users information could not be retrieved" })
    })
})

server.get('/api/users/:id', (req, res) => {
  users.findById(req.params.id)
    .then( user => {
      if(user === undefined)
        return res.status(404).json({ message: "The user with the specified ID does not exist" })
        // return res.status(404).json({message: `Could not find user with id ${req.params.id}`})
      return res.status(200).json(user)
    })
    .catch( () => {
      return res.status(500).json({ message: "The user information could not be retrieved" })
    })
})

server.delete('/api/users/:id', (req, res) => {
  users.remove(req.params.id)
    .then( user => {
      if(user === null)
        return res.status(404).json({ message: "The user with the specified ID does not exist" })
      return res.status(200).json(user)
    })
    .catch( () => {
      return res.status(500).json({ message: "The user could not be removed" })
    })
})

server.put('/api/users/:id', (req, res) => {
  const {name, bio} = req.body
  if(!name || !bio)
    return res.status(400).json({ message: "Please provide name and bio for the user" })

  users.update(req.params.id, req.body)
    .then( user => {
      if( user === null)
        return res.status(404).json({ message: "The user with the specified ID does not exist" })
      return res.status(200).json(user)
    })
    .catch( () => {
      return res.status(500).json({ message: "The user information could not be modified" })
    })
})


module.exports = server; // EXPORT YOUR SERVER instead of {}
