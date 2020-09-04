const express = require('express');
const shortid = require('shortid')

const server = express();

const port = 5000;

let users = [];

//GET

server.use(express.json());

server.get('/', (req, res) => {
    res.json({ hello: 'world' });
})

//CREATE (POST)
server.post('/api/users', (req, res) => {
    
    const userInfo = req.body;

    // function validateBody(body) {
    //     return true;
    // }

    // if (validateBody(body))

    if (userInfo) {
        userInfo.id = shortid.generate();

        users.push(userInfo);

        res.status(201).json(userInfo);
    } else {
        res.status(400).json({ errorMessage: "Please provide name and bio for the user." });
    }
})

//READ (GET)
server.get('/api/users', (req, res) => {
    res.json(users);
})

//UPDATE (PUT)
server.put('/api/users/:id', (req, res) => {
    const { id } = req.params;
    const changes = req.body;
    changes.id = id;

    let index = users.findIndex(user => user.id === id);

    if (index !== -1) {
        users[index] = changes;
        res.status(201).json(users[index]);
    } else {
        res.status(404).json({message: 'user id not found'});
    }
})

//DELETE
server.delete('/api/users/:id', (req, res) => {
    
    const { id } = req.params;

    const deleted = users.find(user => user.id === id);

    if (deleted) {
        users = users.filter(user => user.id !== id);
        res.status(200).json(deleted);
    } else {
        res.status(404).json({ message: 'user not found'});
    }

})

server.listen(port, () => {
    console.log(`server listening on port ${port}`);
});