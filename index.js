const express = require("express")
const db = require("./database")

const server = express();

// This is installing some middleware to allow Express
// to parse JSON request bodies.
server.use(express.json())

server.post('/api/users', (req, res) => {
    if(!req.body.name || !req.body.bio){
        return res.status(400).json({
            errorMessage: "Please provide name and bio for the user"
        })
    } else if(req.body.name && req.body.bio){
        const newUser = db.createUser({
            name: req.body.name,
            bio: req.body.bio
        })
        res.status(201).json
        return newUser
    } else {
        res.status(500).json({
            errorMessage: "There was an error while saving the user to the database"
        })
    }

})

server.get('/api/users', (req, res) => {
    const users = db.getUsers()

    if(!users){
        return res.status(500).json({
            errorMessage: "The users information could not be retrieved."
        })
    } else {
        return users
    }

})

server.get('/api/users/:id', (req, res) => {
    const user = db.getUserById(req.params.id) //what are params

    if (user) {
        return user
    } else if (!user) {
        return res.status(404).json({
            message: "The user with the specified ID does not exist."
        })
    } else {
        return res.status(500).json({
            errorMessage: "The user information could not be retrieved."
        })
    }

})

server.delete('/api/users/:id', (req, res) => {
    const user = db.getUserById(req.params.id)

    if(!user){
        return res.status(404).json({
            message: "The user with the specified ID does not exist."
        })
    } else if (user){
        db.deleteUser(user.id)
        res.status(200).json
    } else {
        res.status(500).json({
            errorMessage: "User could not be removed"
        })
    }

})

server.put('/api/users/:id', (req, res) => {
    const user = db.getUserById(req.params.id)

    if(!user){
        return res.status(404).json({
            message: "The user with the specified ID does not exist."
        })
    } else if(!user.name || !user.bio){
        return res.status(400).json({
            errorMessage: "Please provide name and bio for the user"
        })
    } else if(user.name || user.bio){
        const updatedUser = db.updateUser(user.id, {
            name: req.body.name || user.name, //EXPLAIN
            bio: req.body.bio || user.bio
        })
        res.status.json(200)
    } else {
        res.status(500).json({
            errorMessage: "The user information could not be modified."
        })
    }

})

server.listen(4000, () => {
    console.log("********* server started on port 4000 *********")
})