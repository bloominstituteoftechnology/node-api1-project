const express = require('express');
const shortid = require('shortid');
const { json } = require('express');
const server = express();

server.use(express.json());

let users = [];

server.get('/', (req, res) => {
    res.json({ message: 'Hello Lexi!' });
})

//POST - Crud
server.post('/api/users', (req, res) => {
    const userInfo = req.body;

    userInfo.id = shortid.generate();

    if (!userInfo.name || !userInfo.bio ) {
        res.status(400).json({ errorMessage: "Please provide name and bio for the user." })
    } else if (!userInfo) {
        res.status(500).json({ errorMessage: "The users information could not be retrieved." })
    } else {
        users.push(userInfo);
        res.status(201).json(userInfo);
    }
})

//GET - cRud
server.get('/api/users', (req, res) => {
    if (!users) {
        res.status(500).json({ errorMessage: "The users information could not be retrieved." })
    } else {
        res.status(201).json(users);
    }
})

server.get('/api/users/:id', (req, res) => {
    const { id } = req.params;
    let found = users.find(user => user.id === id)
    if (found) {
        res.status(201).json(found);
    } else {
        res.status(404).json({ message: "The user with the specified ID does not exist." })
    }
})



const PORT = 5000;

server.listen(PORT,() => {
    console.log(`listening on http://localhost:${PORT}`);
});