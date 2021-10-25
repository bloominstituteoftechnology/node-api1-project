// BUILD YOUR SERVER HERE
const express = require('express');
const User = require('./users/model');

const server = express();

server.use(express.json());

// [GET] / (Hello World endpoint)
server.get('/api', (req, res) => {
  res.json({ message: 'hello, world' })
})

server.get('/api/users', async (req, res) => {
    try {
      const users = await User.find() // trip to the db using an async helper function
      res.status(200).json(users)
    } catch (error) {
      console.log(error.message) // log statement!!
      res.status(500).json({ message: "The users information could not be retrieved" })
    }
  })

  server.get('/api/users/:id', async (req, res) => {
    try {
      const { id } = req.params
      const user = await User.findById(id)
      if (!user) {
        res.status(404).json({ message: "The user with the specified ID does not exist" })
      } else {
        res.status(200).json(user)
      }
    } catch (error) {
      res.status(500).json({ message: "The user information could not be retrieved" })
    }
  })



  // [POST] /api/users (C of CRUD, create new dog from JSON payload)
server.post('/api/users', async (req, res) => {
  try {
    // 1- gather info from client
    const { name, bio } = req.body
    // 2- assume stuff is bad, handle
    if (!name || !bio) {
      res.status(400).json({ message: "Please provide name and bio for the user" })
    } else {
      // 3- hit the db and send the stuff
      const user = await User.insert({ name, bio })
      res.status(201).json(user)
    }
  } catch (error) {
    res.status(500).json({ message: "There was an error while saving the user to the database" })
  }
})
  
// [DELETE] /api/users/:id (D of CRUD, remove dog with :id)
server.delete('/api/users/:id', (req, res) => {
  const { id } = req.params
  User.remove(id)
    .then(deletedUser => {
      if (!deletedUser) {
        res.status(404).json({ message: "The user with the specified ID does not exist" })
      } else {
        res.status(200).json(deletedUser)
      }
    })
    .catch(error => {
      res.status(500).json({ message: "The user could not be removed" })
    })
})


// [PUT] /api/dogs/:id (U of CRUD, update dog with :id using JSON payload)
server.put('/api/users/:id', async (req, res) => {
  try {
    // 1- gather info from client
    const { id } = req.params
    const { name, bio } = req.body
    // 2- assume stuff is bad, handle
        
    if (!name || !bio) {
      res.status(400).json({ message: "Please provide name and bio for the user" })
    } else {
      // 3- hit the db and send the stuff
      const updatedUser = await User.update(id, { name, bio })
      if(updatedUser){
        res.status(200).json(updatedUser)
      } else {
        res.status(404).json({ message: "The user with the specified ID does not exist" })
      }
      
    }
  } catch (error) {
    res.status(500).json({ message: "The user information could not be modified" })
  }
})
module.exports = server; // EXPORT YOUR SERVER instead of {}
