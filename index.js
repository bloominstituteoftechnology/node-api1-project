// implement your API here

const express = require('express')
let db = require('./data/db')

const app = express()

app.use(express.json())


app.get('/', (req, res) => {
    console.log('ip: ', req.ip)
    res.status(200).json({ message: "Welcome to Node/Express!"})
})

//getting a list of all users.

app.get('/users', (req, res) => {
    //I want to see the IP of the request.
    console.log('ip: ', req.ip)
    //we're returning the entire database object in the request.
    res.json (db)
})

app.get('/users/:id', (req, res) => {
    const user = db.find(row => row.id === req.params.id)
    user 
        ? res.json(user)
        : res.status(404).json({ message: "The user with the specified ID does not exist." })
})

app.post('/users/', (req, res) => {
    if(!req.body.name || !req.body.bio) {
        return res.status(400).json({ error: "Need a user name and bio!" })
    }

    const newUser = {
        name: req.body.name,
        bio: req.body.bio
    }

    db.push(newUser)
    res.status(201).json(newUser)
})

app.delete('/users/:id', (req, res) => {
    const user = db.find(row => row.id === req.params.id)
    user 
        //if I'm doing this correctly, we should get back everything that /doesn't/ match the ID of the user I'm providing.
        ? db = db.filter(row = row.id !== row.params.id)
        : res.status(404).json({ message: "The user with the specified ID does not exist." })
})

const port = 8080
const host = "127.0.0.1" //this is another way of saying localHost.

app.listen(port, host, () => {
    console.log(`server running at http://${host}:${port}/api`)
})
