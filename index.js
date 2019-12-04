// implement your API here

const express = require('express')
let db = require('./data/db')

const app = express()

app.use(express.json())


//getting a list of all users.

app.get('/api/users', (req, res) => {
    //I want to see the IP of the request.
    console.log('ip: ', req.ip)
    //we're returning the entire database object in the request.
    res.json (db)
})

app.get('/api/users/:id', (req, res) => {
    const user = db.find(row => row.id === req.params.id)
    user 
        ? res.json(user)
        : res.status(404).json({ error: "User not found!" })
})

app.post('/api/users/', (req, res) => {
    if(!req.body.name || !req.body.bio) {
        return res.status(400).json({ error: "Need a user name and bio!" })
    }

    const newUser = {
        id: String(db.length + 1 ),
        name: req.body.name,
        bio: req.body.bio
    }

    db.push(newUser)
    res.status(201).json(newUser)
})