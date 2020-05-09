const express = require('express');
const shortid = require('shortid');

const server = express();

server.use(express.json());

const PORT = 3000;

let users = []

server.get('/api/users', (req,res) => {
    if(!users){
        res.status(500).json({ errorMessage: "The users information could not be retrieved." })
    } else {
        res.status(200).json({users})
    }
    
})

server.get('/api/users/:id', (req,res) => {
    const user = users.find(user => user.id === req.params.id)
    if(user){
        res.status(200).json({user})
    } else {
        res.status(404).json({message: "The user with the specified ID does not exist."})
    }
})

server.post('/api/users', (req,res) => {
    const user = req.body;
    console.log(user)
    if(!user.name || !user.bio){
        res.status(400).json({ errorMessage: "Please provide name and bio for the user." })
    } else {
        user.id = shortid.generate()
        users.push(user)
        res.status(201).json(users)
    }
    
})

server.delete('/api/users/:id', (req,res) => {
    console.log(req.params.id)
    const user = users.find(user => user.id === req.params.id)
    if(user){
        users = users.filter(u => u.id != user.id)
        res.status(200).json(users)
    } else {
        res.status(404).json({message: "The user with the specified ID does not exist."})
    }
})

server.patch('/api/users/:id', (req,res) => {
    let user = users.find(user => user.id === req.params.id)
    const changes = req.body
    if (!req.body.name || !req.body.bio ) {
        res.status(400).json({ errorMessage: "Please provide name and bio for the user." })
    } else if (user) {
        Object.assign(user, changes)
        res.status(200).json({user})
    } else {
        res.status(404).json({ message: "The user with the specified ID does not exist." })
    }
    
})

server.listen(PORT, () => {
    console.log(`listening on port http://localhost:${PORT}`)
})