const express = require('express')  // import express as express
const shortid = require('shortid')  // import shortid as shortid

const server = express()

server.use(express.json())  // configure the server. Lets you read the body of the request as JSON

let users = []

const User = {
  createNew(user) {
    const newUser = { id:shortid.generate(), ...user}
    users.push(newUser)
    return newUser
  },
  getAll() {
    return users
  },
  getById(id) {
    return users.find(user => user.id === id)
  },
  delete(id) {
    const user = users.find(user => user.id === id)
    if (user) {
      users = users.filter(d => d.id !== id)
    }
    return user
  },
  update(id, change) {
    
  }
}

// endpoints for Users
server.post('/api/users', (req, res) => {
  const userFromClient = req.body
  try{
    if (!userFromClient.name || !userFromClient.bio){
      res.status(400).json({ errorMessage: "Please provide name and bio for the user." })
    } else {
        const newlyCreatedUser = User.createNew(userFromClient)
        res.status(201).json(newlyCreatedUser)
    }
  }catch(error){
    console.trace("CREATE ERROR: ", error)
    res.status(500).json({ errorMessage: "There was an error while saving the user to the database" })
  }
})
server.get('/api/users', (req, res) => {
  try{
    const users = User.getAll()
    if (users) {
    res.status(200).json(users)
  }
  }catch(error){
    console.trace("CREATE ERROR: ", error)
    res.status(500).json({ errorMessage: "The users information could not be retrieved." })
  }
})
server.get('/api/users/:id', (req, res) => {
  try{
    const { id } = req.params
    const user = User.getById(id)
    if(user){
      res.status(200).json(user)
    }else {
      res.status(404).json({ message: "The user with the specified ID does not exist." })
    }
  }catch(error){
    console.trace("CREATE ERROR: ", error)
    res.status(500).json({ errorMessage: "The user information could not be retrieved." })
  }
})
server.delete('/api/users/:id', (req, res) => {
  try{
    const { id } = req.params
    const deleted = User.delete(id)
    if (deleted) {
      res.status(200).json(deleted)
    } else {
      res.status(404).json({ message: "The user with the specified ID does not exist." })
    }
  }catch(error){
    console.trace("CREATE ERROR: ", error)
    res.status(500).json({ errorMessage: "The user could not be removed" })
  }
})


// catch-all endpoint
server.use('*', (req,res) => {
  res.status(404).json({ message: 'not found' })
})

// start the server
server.listen(5000, () => {
  console.log('listening on port 5000')
})