const express = require('express')
const shortId = require('shortid')
const cors = require('cors')
const server = express()

server.use(express.json())
server.use(cors())

let users = []

// GET all users

server.get('/api/users', (req, res) => {
    res.status(200).json(users)
})


// POST a new user into DB with the info sent into req.body

server.post('/api/users', (req, res) => {
    let newUser = req.body

    if(newUser.name && newUser.bio) {
        newUser.id = shortId.generate()
        if(users.push(newUser)) {
            res.status(201).json(newUser)
        } else {
            res.status(500).json({ errorMessage: "There was an error while saving the user to the database" })
        }
        
    } else {
        res.status(400).json({errorMessage: "Please provide name and bio for the user."})
    }

    
})


// GET an specific user based on : userId

server.get('/api/users/:userId', (req, res) => {
    const { userId } = req.params

    let specificUser = users.find( user => userId === user.id )

    if(specificUser) {
        res.status(200).json(specificUser)
    } else {
        res.status(404).json({ message: "The user with the specified ID does not exist." })
    }

})


// DELETE an user based on :userId, and return the deleted Object

server.delete('/api/users/:userId', (req, res) => {
    const { userId } = req.params

    let specificUser = users.find( user => userId === user.id )

    if(specificUser) {
        users = users.filter(user => user.id !== userId)
        res.status(200).json(specificUser)
    } else {
        res.status(404).json({ message: "The user with the specified ID does not exist." })
    }
})


// PUT an user based on :userId, updating it data with the info sent in req.body

server.put('/api/users/:userId', (req, res) => {
    const { userId } = req.params
    const changes = req.body

    if(changes.name && changes.bio) {
        let specificUserIndex = users.findIndex( user => userId === user.id )

        if(specificUserIndex !== -1) {
            changes.id = userId
            users[specificUserIndex] = changes
            res.status(200).json(users[specificUserIndex])
        } else {
            res.status(404).json({message: "User Not found"})
        }
    } else {
        res.status(400).json({ errorMessage: "Please provide name and bio for the user." })
    }
    
})










const _PORT = 5000


server.listen(_PORT, () => {
    console.log(`Server listening in port ${_PORT} ...`);
})