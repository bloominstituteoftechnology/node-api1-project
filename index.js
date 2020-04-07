
// server setup

const express = require('express')
const shortid = require('shortid')
const server = express();
const port = 5000;
server.listen(port, () => console.log(`\n == api on port ${port} ==`))
server.use(express.json());

// data
let users = [
    {
        id: shortid.generate(),
        name: 'Joe Exotic',
        bio: 'Tiger king is king of tigers'
    },{
        id: shortid.generate(),
        name: 'Carole Baskin',
        bio: 'All tigers are kings'
    },{
        id: shortid.generate(),
        name: 'Bhagavan Antle',
        bio: 'Big money tiger bois'
    }
]

// endpoints
server.get('/', (req, res) => {
    res.status(200).json({ api: 'running...'})
})

server.get('/api/users', (req, res) => {
    res.status(200).json(users);
})

server.post('/api/users', (req,res) => {
    const userPost = req.body
    userPost.id = shortid.generate()
    if(userPost.name && userPost.bio) {
        users.push(userPost)
        res.status(201).json(users)
    } else {
        res.status(400).json({ errorMessage: "Please provide name and bio for the user." })
    }
})

server.get('/api/users/:id', (req, res) => {
    const id = req.params.id;
    const user = users.find(user => user.id == id)
    if(user){
        res.status(200).json(user);
    }else {
        res.status(404).json({ message: "The user with the specified ID does not exist." })
    }
    
})

server.delete('/api/users/:id', (req,res) => {
    const id = req.params.id;
    const user = users.find(user => user.id == id)
    if(user){
        users = users.filter(curUser => curUser.id !== id)
        res.status(200).json(users);
    }else {
        res.status(404).json({ message: "The user with the specified ID does not exist." })
    }
})

server.patch('/api/users/:id', (req,res) => {
    const id = req.params.id;
    const user = users.find(user => user.id == id)
    if(!req.body.name || !req.body.bio) {
        res.status(400).json({ errorMessage: "Please provide name and bio for the user." })
    } else if(!user){
        res.status(404).json({ message: "The user with the specified ID does not exist." })
    }else {
        user.name = req.body.name
        user.bio = req.body.bio
        res.status(200).json(user);
    }
})