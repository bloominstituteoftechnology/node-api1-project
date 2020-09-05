const express = require('express');
const shortid = require('shortid');
const server = express();

let users = [];

server.use(express.json());

server.post('/api/users', (req, res) => {
    const userInfo = req.body;

    if(userInfo.name && userInfo.bio) {
        userInfo.id = shortid.generate()
        if(users.push(userInfo)) {
            res.status(201).json(userInfo)
        } else {
            res.status(500).json({errorMessage: "There was an erro while saving the user to the database"})
        }
    } else {
        res.status(400).json({errorMessage: "Please provide name and bio for the user."})
    }

    function validateBody(body) {
        return true;
    }

})

server.get('/api/users', (req, res) => {
    res.status(200).json(users);
})

server.get('/api/users/:id', (req, res) => {
    const {id} = req.params

    let retrieved = users.find(user => id === user.id)

    if(retrieved) {
        res.status(200).json(retrieved);
    } else {
        res.status(404).json({message: "The user with the specified ID does not exist."})
    }
    
})

server.delete('/api/users/:id', (req, res) => {
    const {id } = req.params;

    const deleted = users.find(user => user.id === id);

    if (deleted) {
        users = users.filter(user => user.id !== id);
        res.status(200).json(deleted);
    } else {
        res.status(404).json({message: 'The user with the specified ID does not exist.'});
    }
});

server.put('/api/users/:id', (req, res) => {
    const {id} = req.params;
    const changes = req.body;

    if (changes.name && changes.bio) {
        let index = users.findIndex(user => id === user.id)

        if(index !== -1) {
            changes.id = id
            users[index] = changes
            res.status(200).json(users[index])
        } else {
            res.status(404).json({message: "The user with the specified ID does not exist."})
        }
    } else {
        res.status(400).json({ errorMessage: "Please provide name and bio for the user."})
    }
})

const PORT = 5000

server.listen(PORT, () => {
    console.log(`listening on port ${PORT}`);
});