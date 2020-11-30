const express = require('express')  // import express as express
const shortid = require('shortid')  // import shortid as shortid

const server = express()

server.use(express.json())  // configure the server. Lets you read the body of the request as JSON

const users = []

const User = {
  createNew(user) {
    const newUser = { id:shortid.generate(), ...user}
    users.push(newUser)
    return newUser
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

// catch-all endpoint
server.use('*', (req,res) => {
  res.status(404).json({ message: 'not found' })
})

// start the server
server.listen(5000, () => {
  console.log('listening on port 5000')
})