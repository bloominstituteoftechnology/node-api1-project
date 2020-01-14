// implement your API here
const express = require('express');

const Users = require('./data/db.js');

const server = express();

server.use(express.json());

// testing server set up

server.get('/', function(req, res){
    res.send({hello: 'Web 25!'})
})

// GET request to return an array of all the user objects in the database

server.get('/api/users', (req, res) => {
    Users.find()
    .then(users => {
        res.status(200).json(users)
    })
    .catch(error => {
        console.log(error)
        res.status(500).json({errorMessage: "The users information could not be retrieved."})
    })
})

// GET request to return a user by ID 

server.get('/api/users/:id', (req, res) => {
    const id = req.params.id;
    Users.findById(id)
    .then(users => {
        if (users){
            res.status(200).json(users)
        } else {
            res.status(404).json({message: "The user with the specified ID does not exist."})
        };
    })
    .catch(err => {
        res.status(500).json({errorMessage: "The user information could not be retrieved."})
    })
})

//  POST request create a user using the information sent inside the request body

server.post('/api/users', (req, res) => {
    const {name, bio} = req.body; 
    Users.insert({name, bio}) 
    .then(data => {
        if( !name || !bio){

            res.status(400).json({ message: "Please provide name and bio for the user."})

        } else {
            res.status(201).json(data);
        }
    })
    .catch(err => {
        console.log('error on POST/api/users', err);
        res.status(500).json({errorMessage: "There was an error while saving to the database" });
    });
});

// DELETE removes the user with the specified id and returns the deleted user

server.delete('/api/users/:id', (req, res) => {
    const id = req.params.id;
    Users.remove(id)
    .then(removed => {
        if (removed){
            res.status(200).json({message: 'user was removed', removed });
        } else {
            res.status(404).json({message: "The user with the specified ID does not exist."})
        }
    })
    .catch(err => {
        res.status(500).json({errorMessage: "The user could not be removed"})
    })
})

// PUT request updates the user with the specified id using data from the request body- returns the modified document

server.put('/api/users/:id', (req, res) => {
    const user = req.body;
    const id = req.params.id;

    Users.findById(id)
    .then(users => {
        if (users) {
            res.status(200).json({message: "The user was updated successfully"});
        } else {
            res.status(404).json({message: "The user with the specified ID does not exist." })
        }
    })
        if (user.name && user.bio) {
            Users.update(id, user)
            .then(user => {
                res.status(200).json(user);
            })
            .catch(err => {
                res.status(500).json({errorMessage: "The user information could not be modified." })
            })
        } else if (!user.id){
            res.status(404).json({message: "The user with the specified ID does not exist."})
        } 
        else {
            res.status(400).json({errorMessage: "Please provide name and bio for the user." })
        }
});



const port = 8000;
server.listen(port, () => console.log(` \n ** api on port ${port} ** \n`))