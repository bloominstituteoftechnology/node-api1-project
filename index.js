// implement your API here

const express = require('express')
let db = require('./data/db')

const app = express()

app.use(express.json())

//this is a request handler function. 
app.get('/api/', (req, res) => {
    console.log('ip: ', req.ip)
    res.status(200).json({ message: "Welcome to Node/Express!"})
})

//getting a list of all users.
app.get('/api/users', (req, res) => {
    db.find()
    .then(user => {
        res
            .status(200)
            .json(user)
    })
    .catch(() => {
        res
            .status(404)
            .json({error: "Unable to locate users!"})
    })
})

//getting a specific user by ID.
app.get('/api/users/:id', (req, res) => {
    db.findById(req.params.id)

    .then((user) => {
        res
            .status(200)
            .json(user)
    })
    .catch(() => {
        res
            .status(404)
            .json({ error: "User not found!" })
            console.log(error)
    })
   
})

//adding a new user to the database.
app.post('/api/users/', (req, res) => {
    if(!req.body.name || !req.body.bio) {
        return res
            .status(400)
            .json({ error: "Need a user name and bio!" })
    }

    const newUser = {
        name: req.body.name,
        bio: req.body.bio,
        // created_at: Date(),
        // updated_at: Date()
    }

    db.insert(newUser)
    res
        .status(201)
        .json(newUser)
})

//deleting a user from the database.
app.delete('/api/users/:id', (req, res) => {
    const user = db.find(row => row.id === req.params.id)
    user 
        //if I'm doing this correctly, we should get back everything that /doesn't/ match the ID of the user I'm providing.
        ? db = db.filter(row = row.id !== row.params.id)
        : res.status(404).json({ message: "The user with the specified ID does not exist." })
})

//updating a user's information on the database.

const port = 8080
const host = "127.0.0.1" //this is another way of saying localHost.

app.listen(port, host, () => {
    console.log(`server running at http://${host}:${port}`)
})
