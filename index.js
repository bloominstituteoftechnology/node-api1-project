const express = require('express')
let Users = require('./data/db')

const server = express()

server.use(express.json())

server.get('/', (req, res) => {
    res.send('success')
})

// ? gets user by id
server.get('/users', (req, res) => {
    Users.find()
    .then( users=> {
        res.status(200).json(users)
    })
    .catch( err => {
        res.status(500).json({ message: 'The users information could not be retrieved.' })
    })
})
 
// ? creates new user
server.post('/users', (req, res) => {
    // create a user
    const newUser = req.body
    if (!newUser.name || !newUser.bio) {
         //respond with HTTP status code 400(Bad Request)
    //return the JSON error response
    res.status(400).json({ errorMessage: 'Please provide name and bio for the user.' })
    }else{
        Users.insert(newUser)
        .then( result => {
        res.status(201).json(result)
    })
        .catch( err => res.status(500).json({ errorMessage: "There was an error while saving the user to the database" }))
    }
   
})

// ? deletes user
server.delete('/users/:id', (req, res) => {
    const {id} = req.params
    Users.remove(id)
    .then(results => {
        if(results){
        res.status(200).json({ message: "Delete successful. "})
    } else{
        res.status(400).json({ message: "The user with the specified ID does not exist. "})
    }})
    .catch(err => res.status(500).json({message: 'Error deleting user'}))
})

// ? updates user
server.put('/users/:id', (req, res) => {
    const {id} = req.params
    const userInfo = req.body
    if(!userInfo.name || !userInfo.bio){
        res.status(400).json({ errorMessage: "Please provide name and bio for the user." })
    } else {
        Users.update(id, userInfo)
        .then(updateUser => {
            if(updatedUser){
                res.status(200).json(updateUser)
            }else{
                res.status(404).json({ error: "The user could not be removed" })
            }
        })
        .catch( err => res.status(500).json({ error: "The user information could not be modified"}))
    }
})
const port = 8085
// start the server on localhost at port 8085
server.listen(port, ()=> {
    console.log(`server started at http://localhost:${port}`)
})