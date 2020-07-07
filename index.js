const express = require('express')
const shortid = require('shortid')

const server = express()

server.use(express.json())

let users =[

    {
        id: shortid.generate(),
        name: 'Dawna',
        bio: 'Spirit filled Christian',
    },

    {
        id: shortid.generate(),
        name: 'Jim',
        bio: 'Amazing father',
    },

    {
        id: shortid.generate(),
        name: 'Dawna',
        bio: 'Mother bear',
    },

    {
        id: shortid.generate(),
        name: 'Jimmy',
        bio: 'Mechanic',
    },

    {
        id: shortid.generate(),
        name: 'Stephen',
        bio: 'Techie',
    },
]

server.get('/api/users', (req, res) => {

    res.status(200).json(users)

})

server.get('/api/users/:id', (req, res) => {

    res.status(200).json(users)

})

server.post('/api/users', (req, res) => {

    const newUser = req.body
    newUser.id = shortid.generate()
    users.push(newUser)
    res.status(201).json(newUser)

})

server.put('/api/users/:id', (req, res) => {

    const id = req.params.id
    const update = req.body

    let found = users.findIndex(user => user.id === id)

    if(found) {
        Object.assign(found, update)
        res.status(200).json(found)
    } else {
        res.status(404).json({message: 'The user with the specified Id does not exist.'})
    }

})

server.delete('/api/users/:id', (req, res) => {

    const id = req.params.id
    const deleted = users.find(user => user.id === id)
    
    if(deleted){
        users = users.filter(user => user.id !== id)
        res.status(200).json(deleted)
    } else {
        res.status(404).json({message: 'The user with the specified Id does not exist.'})
    }
})

const PORT = 5000
server.listen(PORT, () => console.log(`server running on port ${PORT}`))