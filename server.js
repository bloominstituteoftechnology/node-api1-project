const express = require('express')

const db = require('./data')

const server = express()

server.use(express.json())


server.get('/api/users', (req,res) => {
    const users = db.getUsers()
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

    res.json(user)
})

server.listen(4000, () => {
    console.log('running on port 4000')
})