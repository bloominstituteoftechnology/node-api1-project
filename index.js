const shortid = require('shortid')
const express = require('express')
const e = require('express')
const server = express()

server.use(express.json())

let users = [
    {
        id: shortid.generate(),
        name: "John Frum",
        bio: "Destined to come through for you."
    },
    {
        id: shortid.generate(),
        name: "Baba Yaga",
        bio: "Hails from Russia, takes her vodka cold."
    },
    {
        id: shortid.generate(),
        name: "Prestor John",
        bio: "Wisest man in Ethiopia, and the competition is pretty stiff over there."
    },
]

//GET REQUESTS//

server.get('/', (req, res) => {
    res.status(200).json({ message: "Hey dude, server on." })
})

server.get('/api/users', (req, res) => {
    if (users) {
        res.status(200).json({data: users})
    } else {
        res.status(500).json({message: "The users information could not be retrieved."})
    }
})

server.get('/api/users/:id', (req, res) => {
    const id = req.params.id
    if (users.find(user => user.id === id)) {
        const uniqUser = users.filter(user => user.id === id)
        res.status(200).json(uniqUser)
    } else if (!users.find(user => user.id === id)) {
        res.status(404).json({message: "The user with the specified ID does not exist." })
    } else {
        res.status(500).json({ errorMessage: "The user information could not be retrieved." })
    }
})

// POST REQUEST //
server.post('/api/users', (req, res) => {
    const user = req.body
    if (user.bio && user.name) {
        users.push({
            id: shortid.generate(),
            ...user
        })
        res.status(201).json({data: users})
    } else {
        res.status(400).json({errorMessage: "Please provide name and bio for the user."})
    }

})
// PUT REQUEST //
server.put('/api/users/:id', (req, res) => {
    const id = req.params.id
    const editedUser = req.body

    let user = users.find(userToEdit => userToEdit.id === id)
   if (!editedUser.bio || !editedUser.name){
       res.status(400).json({errorMessage: "Please provide name and bio for the user."})
   } else if (user.id === id) {
        Object.assign(user, editedUser)
        res.status(200).json(user)
    } else {
        res.status(404).json({ message: "The user with the specified ID does not exist." })
    }
})

// DELETE REQUEST //
server.delete('/api/users/:id', (req, res) => {
    const id = req.params.id
    if (users.find(user => user.id === id)) {
        const newUsers = users.filter(user => user.id !== id)
        res.status(200).json(newUsers)
    } else if (!users.find(user => user.id === id)) {
        res.status(404).json({message: "The user with the specified ID does not exist." })
    } else {
        res.status(500).json({ errorMessage: "The user could not be removed" })
    }
})

const port = 8000
server.listen(port, () => console.log("Server prime, online!"))