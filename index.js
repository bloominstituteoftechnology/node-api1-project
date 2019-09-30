// implement your API here

//http module 
const http = require('http');

const express = require('express');

const server = express();

server.use(express.json());

//adding the model
const db = require('./data/db.js');

//get 
server.get('/', (req, res) => {
    res.send('Welcome!');
});

//get all seed users
server.get('/api/users', (req, res) => {
    db.find()
    .then(users => {
        res.send(users)
    })
    .catch(error => {
        res.send({ error: "The users information could not be retrieved." });
        res.statusCode = 500;
    });
})

//get specific user
server.get('/api/users/:id', (req, res) => {
    const id = req.params.id;
    db.findById(id)
    .then(user => {
        res.send(user)
    })
    .catch(error => {
        res.send(error, 'error in the user get req.');
    })
})

//post for users
server.post('/api/users', (req, res) => {
    const userInfo = req.body;
    db.insert(userInfo)
    .then(user => {
        res.json(user);
    })
    .catch(error => {
        res.json({message: 'error in your post'});
    });
})

//put 
server.put('/api/users/:id', (req, res) => {
    const id = req.params.id;
    const user = req.body;
    db.update(id, user)
    .then(user => {
        res.json(user);
    })
    .catch(error => {
        res.json({ message: 'The user with the specified ID does not exist.' });
    });
})




//port 
const port = 5000;
server.listen(port, () => {
    console.log(`\n** API is running on ${port}! \n`);
})