// import express dependency
const express = require('express');
const shortid = require('shortid');

const server = express();
server.use(express.json());

// define users
let users = [
    { id: shortid.generate(), name: 'Mario', bio: 'Italian-American plumber and hero' },
    { id: shortid.generate(), name: 'Luigi', bio: 'Italian-American plumber who is Mario\'s younger brother' }
];

// test message
server.get('/', (req, res) => {
    res.status(200).json({ message: 'Server is running.' });
});

// get all users
server.get('/users', (req, res) => {
    res.status(200).json(users);
})

// get user with id 
server.get('/users/:id', (req, res) => {
    const { id } = req.params;
    const user = users.find(user => user.id === id)
    if(!user){
        res.status(404).json({ message: `user with id ${id} not found.` })
    } else {
        res.status(200).json(user);
    };
});

// update user with id
server.put('/users/:id', (req, res) => {
    const { id } = req.params;
    const { name, bio } = req.body;
    const userIndex = users.findIndex(user => user.id === id);

    if (userIndex !== -1){
        users[userIndex] = { id, name, bio}
        res.status(200).json({ id, name, bio })
    } else {
        res.status(404).json({ message : 'User with that ID doesn\'t exist.'})
    };
});

// add new user
server.post('/users', (req, res) => {
    const { name, bio } = req.body;
    if (!name || !bio) {
        res.status(401).json({ message: 'Please provide name and bio for user.' })
    } else {
        const newUser = { id: shortid.generate(), name, bio }
        users.push(newUser);
        res.status(201).json(newUser);
    };
});

// delete user
server.delete('/users/:id', (req, res) => {
    const { id } = req.params;
    if (!users.find(user => user.id === id)) {
        res.status(404).json({ message: 'User with that ID not found.'});
    } else {
        users = users.filter(user => user.id !== id)
        res.status(200).json({ message: `iser ${id} was deleted.`})
    }
})

server.listen(3000, () => {
    console.log('Listening on port 3000...');
});