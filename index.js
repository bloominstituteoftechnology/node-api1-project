const express = require('express')
const server = express()

server.use(express.json())

let users = [
    {
        id: 1,
        name: 'Maycie',
        bio: 'Mom'
    },
    {
        id: 2,
        name: 'Eric',
        bio: 'Dad'
    },
    {
        id: 3,
        name: 'Tristan',
        bio: 'Son'
    },
    {
        id: 4,
        name: 'Bruno',
        bio: 'Uncle'
    }
]

let nextId = 4

// GET /users

server.get('/users', (req, res) => {
    res.status(200).json({
        data: users
    })
})

// POST /users

server.post('/users', (req, res) => {
    const data = req.body
    users.push({ id: nextId++, ...data })
    res.status(201).json({ data, users })
})

// PUT 

server.put('/users/:id', (req, res) => {
    const id = Number(req.params.id)
    const changes = req.body
    const found = users.find(u => u.id === id)

    if (found) {
        Object.assign(found, changes)
        res.status(200).json({ data: users })
    } else {
        res.status(404).json({ message: "Users not found" })
    }
})

// DELETE

server.delete('/users/:id', (req, res) => {
    const id = Number(req.params.id)

    users = users.filter(u => u.id !== id)

    res.status(200).json({ data: users })
})



const port = 7000
server.listen(port, () => console.log('server running...'))