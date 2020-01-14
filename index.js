// implement your API here
const express = require('express')

const Users = require('./data/db.js') // Our Users database library

const server = express();

// middleware: teaches express new things

server.use(express.json()); // needed to parse JSON

// routes or endpoints

// GET to "/"
server.get('/', function (request, response) {
    response.send({ hello: "Web 25!" });
});


// See a list of Users -- working 
server.get('/api/users', (req, res) => {
    console.log(res);
    // read the data from the database (Users)
    Users.find() // returns a promise
        .then(users => {
            res.status(200).json(users);
        })
        .catch(err => {
            console.log(err);
            // Handle the error
            res.status(500).json({ errorMessage: "The users information could not be retrieved." })
        })
})


// Create a User -- working but not finished
server.post('/api/users', (req, res) => {
    const userData = req.body;
    console.log(userData)
    const name = req.body.name;
    const bio = req.body.bio;
    // never trust the client, always validate the data
    Users.insert(userData)
        .then(user => {
            res.status(201).json(user);
        })
        .catch(err => {
            console.log(err);
            // Handle the error
            res.status(400).json({ errorMessage: "Please provide a name and bio for the user." })
        })
})

// Delete a User -- working

server.delete('/api/users/:id', (req, res) => {
    const id = req.params.id;
    Users.remove(id)
    .then(result => {
        res.status(204).end();
        // res.status(200).json(result);
    })
    .catch(err => {
        console.log(err);
        // Handle the error
        res.status(404).json({ errorMessage: "The user with the specified ID does not exist." })
    })
})

// Update a User

const port = 8000;

server.listen(port, () => console.log(`\n ** api on port ${port} ** \n`));