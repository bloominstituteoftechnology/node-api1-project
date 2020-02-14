// implement your API here
const express = require('express');

const users = require('./data/db.js');

const server = express();

server.use(express.json());

// Testing testing
server.get('/', (req, res) => {
    res.json({ checking: 'working!'})
})

// Get all users
server.get('/api/users', (req, res) => {
    users.find().then(u => {
        res.status(200).json(u);
    }).catch(err => {
        console.log(err);
        res.status(500).json({ error: 'Error retrieving users' })
    });
})

// Get user by ID
server.get('/api/users/:id', (req, res) => {
    const { id } = req.params;
    users.findById(id).then(u => {
        res.status(200).json(u);
    }).catch(err => {
        console.log(err);
        res.status(500).json({ error: 'Error retreiving specifc user' })
    });
})

// Add a new user
server.post('/api/users', (req, res) => {
    const userInfo = req.body;
    users.insert(userInfo)
        .then(u => {
            res.status(200).json(u);
        }).catch(err => {
            console.log(err);
            res.status(500).json({ error: 'Error adding a user' })
        })
})

// Edit a user
server.put('/api/users/:id', (req, res) => {
    const userInfo = req.body;
    const { id } = req.params;
    users.update(id, userInfo)
        .then(edit => {
            res.status(200).json(edit);
        }).catch(err => {
            console.log(err);
            res.status(500).json({ error: 'Error editting user' })
        })
})

// Delete a user
server.delete('/api/users/:id', (req, res) => {
    const { id } = req.params;
    users.remove(id).then(removedUser => {
        res.status(200).json(removedUser);
    }).catch(err => {
        console.log(err);
        res.status(500).json({ error: 'Error deleting user' })
    })
})


const port = 3000;
server.listen(port, () => {
	console.log(`server started at http://localhost:${port}`)
})