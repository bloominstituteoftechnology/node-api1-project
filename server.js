const express = require('express')
const { restart } = require('nodemon')

const db = require('./data')

const server = express()

server.use(express.json())


server.get('/api/users', (req,res) => {

    const users = db.getUsers()
    if(!users) {
        return res.status(500).json({
            message:"There was an error while retriving the users"
        })
    }
    res.status(200).json(users)
})


server.post('/api/users', (req,res) => {
    if(!req.body.name) {
        return res.status(400).json({
            message: "Need A Username"
        })
    }
    
    const user = db.createUser({
        name: req.body.name,
    })

    res.status(201).json(user)
})

server.get('/api/users/:id', (req,res) => {
 const userId = req.params.id
 const users = db.getUserById(userId)

 if(!userId) {
     return res.status(404).json({
        message: "The user with the specified ID does not exist." 
     })
 }
 if(!users) {
     return res.status(500).json({
        errorMessage: "The user information could not be retrieved."  
     })
 }
 res.status(200).json(users)
})

server.put('/api/users/:id', (req,res) => {
   const user = db.updateUser(req.params.id, req.body)
   
    if(!req.body.name) {
       return res.status(400).json({
           message: "Missing Name"
       })
   }

   if(!req.params.id) {
       return res.status(404).json({
        message: "The user with the specified ID does not exist."
       })
   }

   if(!user) {
       return res.status(500).json({
        errorMessage: "The user information could not be modified." 
       })
   }
   res.json(user)
 
})

server.delete('/api/users/:id', (req,res) => {
    const user = db.deleteUser(req.params.id)

    if(!req.params.id) {
        return res.status(404).json({
            message: "Invalid User"
        })
    }

    if(!user) {
        return res.status(500).json({
            errorMessage: "The user could not be removed" 
        })
    }
    res.json(user)
})

server.listen(4000, () => {
    console.log('running on port 4000')
})