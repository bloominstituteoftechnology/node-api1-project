const shortid = require('shortid')
const express = require('express')
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

const port = 8000
server.listen(port, () => console.log("Server prime, online!"))