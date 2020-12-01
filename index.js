const express = require('express')
const shortid = require('shortid')

const server = express()

server.use(express.json())

let users = [
    {
        id: shortid.generate(),
        name: "Jane Doe",
        bio: "Not Tarzan's Wife, another Jane"
    }
]

const Users = {
    createNew(user) {
        const newUser = { id: shortid.generate(), ...user }
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
            users = users.filter(u => u.id !== id)
        }
        return user
    },
    update(id, changes) {
        const user = users.find(user => user.id === id)
        if (!user) {
            return null
        }
        const updatedUser = { id, ...changes }    
        users = users.map(u => {
            if (u.id === id) {
                return updatedUser
            }
            return u
        })
        return updatedUser
    }
}

//Post new user
server.post('/api/users', (req, res) => {
    const submittedUser = req.body
    if (!submittedUser.name || !submittedUser.bio) {
        res.status(400).json({ errorMessage: "Please provide name and bio for the user." })
    } else if (submittedUser.name && submittedUser.bio){
        const newestUser = Users.createNew(submittedUser)
        res.status(201).json(newestUser)
    } else {
        res.status(500).json({ errorMessage: "There was an error while saving the user to the database" })
    }
})
  
//Get all users
server.get('/api/users', (req, res) => {
    const users = Users.getAll()
    if(users){
        res.status(200).json(users)
    } else {
        res.status(500).json({ errorMessage: "The users information could not be retrieved." })
    }
})

//Get user by ID
server.get('/api/users/:id', (req, res) => {
    const { id } = req.params
    const users = Users.getById(id)
    if (users) {
        res.status(200).json(users)
    } else if (!users){
        res.status(404).json({ message: "The user with the specified ID does not exist." })
    } else {
        res.status(500).json({ errorMessage: "The user information could not be retrieved." })
    }
})

//Delete a user. Destructive method
server.delete('/api/users/:id', (req, res) => {
    const { id } = req.params
    const deleted = Users.delete(id)
    if (deleted) {
        res.status(200).json(deleted)
    } else if (!deleted) {
        res.status(404).json({ message: "The user with the specified ID does not exist." })
    } else {
        res.status(500).json({ errorMessage: "The user could not be removed" })
    }
})

//Update a user
server.put('/api/users/:id', (req, res) => {
    const changes = req.body
    const { id } = req.params
    const updatedUser = Users.update(id, changes)
    if (!updatedUser) {
        res.status(404).json({ message: "The user with the specified ID does not exist." })
    } else if (!updatedUser.name || !updatedUser.bio) {
        res.status(400).json({ errorMessage: "Please provide name and bio for the user." })
    } else if (updatedUser) {
        res.status(200).json(updatedUser)
    } else {
        res.status(500).json({ errorMessage: "The user information could not be modified." })
    }
})


server.use('*', (req, res) => {
    res.status(404).json({ message: 'not found' })
})
  
  // start the server
server.listen(5001, () => {
    console.log('listening on port 5001')
})
