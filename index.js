// | Method | URL            | Description                                                                                            |
// | ------ | -------------- | ------------------------------------------------------------------------------------------------------ |
// | POST   | /api/users     | Creates a user using the information sent inside the `request body`.                                   |
// | GET    | /api/users     | Returns an array users.                                                                                |
// | GET    | /api/users/:id | Returns the user object with the specified `id`.                                                       |
// | DELETE | /api/users/:id | Removes the user with the specified `id` and returns the deleted user.                                 |
// | PUT    | /api/users/:id | Updates the user with the specified `id` using data from the `request body`. Returns the modified user |
const express = require('express');
const shortid = require('shortid')

let users = [];

const server = express();

server.use(express.json())

server.get('/api/users', (req, res) => {
    res.status(200).json(users)
})

server.get('/api/users/:id', (req, res) => {
    const {id} = req.params;

    const requested = users.find(users => users.id === id)
    if (requested) {
        res.status(200).json(requested)
    } else {
        res.status(404).json({message:"user not found"});
    }
})

server.post('/api/users', (req, res) => {
    if(req.body.name && req.body.bio) {
        const newUser = req.body;
        newUser.id = shortid.generate()
        users.push(newUser)

        res.status(201).json(newUser)
    } else {
        res.status(400).json({ 
            errorMessage: "Please provide name and bio for the user." 
        })
    }
})

server.put('/api/users/:id', (req, res) => {
    const {id} = req.params
    const changes = req.body;
    changes.id = id

    let index = users.findIndex(user => user.id === id)

    if (index !== -1 && req.body.name && req.body.bio) {
        users[index] = changes
        res.status(200).json(users[index])
    } else if (index === -1){
        res.status(404).json({message:"user not found"});
    } else if (!req.body.name || !req.body.bio) {
        res.status(400).json({message:"name and bio are required"})
    }
})

server.delete('/api/users/:id', (req, res) => {
    const {id} = req.params;
    const deleted = users.find(user => user.id === id);

    if (deleted) {
        users = users.filter(user => user.id !== id);
        res.status(200).json(users);
    } else {
        res.status(404).json({message:`user with id: ${id} does not exist`});
    }
});

const PORT = 5000;
server.listen(PORT, () => {
    console.log(`server is listening on port: ${PORT}`);
});