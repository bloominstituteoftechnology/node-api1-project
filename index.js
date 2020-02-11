// implement your API here
const express = require('express'); // import the express package

const Users = require('./data/db.js');

const server = express(); // creates the server

// teaches express how to read JSON from the body
server.use(express.json()); // needed for POST and PUT/PATCH

server.get('/api/users', (req, res) => {

    // got and get the hubs from the database
    Users.find().then(vals => {
        res.status(200).json(vals);
    }).catch(err => {
        console.log(err);
        res.status(500).json({ errorMessage: "The users information could not be retrieved."})
    });

})

server.get('/api/users/:id', (req, res) => {

    const { id } = req.params;

    Users.findById(id).then( val => {
        if(val !== undefined) {
            res.status(200).json(val);
        } else {
            res.status(404).json({ message: "The user with the specified ID does not exist." })
        }
    }).catch( err => {
        console.log(err);
        res.status(500).json({errorMessage: "The user information could not be retrieved."})
    });
})

server.delete('/api/users/:id', (req,res) => {

    const { id } = req.params;

    Users.remove(id).then( removed => {
        if(removed !== undefined) {
            res.status(200).json(removed);
        } else {
            res.status(404).json({ message: "The user with the specified ID does not exist." })
        }
    }).catch( err => {
        console.log(err);
        res.status(500).json({errorMessage: 'oops'})
    });
})

server.post('/api/users', (req, res) => {
    const userInfo = req.body;

    if(!userInfo.bio || !userInfo.name) {
        console.log('userInfo', userInfo, 'bio exists: ', userInfo.bio, 'name exists: ', userInfo.name);
        res.status(400).json({errorMessage: "Please provide a name and bio for the user."})
    }

    Users.insert(userInfo)
        .then(user => {  
            res.status(201).json(userInfo);
        }).catch(err => {
            console.log(err);
            res.status(500).json({ errorMessage: '"There was an error while saving the user to the database"'})
        })
})

server.put('/api/users/:id', (req, res) => {
    const { id } = req.params;

    if(Users.getUserById(id) == undefined) {
        res.status(400).json({errorMessage: "The user with the specified ID does not exist"})
    }
})

const port = 5000;
server.listen(port, () => console.log('good to go'));
