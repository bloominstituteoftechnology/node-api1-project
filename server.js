const express = require('express')

const db = require('./data')

const server = express()

server.get('/api/users', (req,res) => {
    const users = db.getUsers()
    res.status(200).json(users)
})

server.listen(4000, () => {
    console.log('running on port 4000')
})