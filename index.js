// implement your API here

const express = require('express');
const server = express();

server.use(express.json()); // this is needed to parse JSON 

const Users = require('./data/db.js');
server.get('/', function(request, response) {
    response.send({data: 'some data'})
})
// GET to see a list of users
server.get('/api/users', (request, response) => {
    // read the data from the database (hubs)
    Users.find() // return a promise
    .then(Users => {
        console.log('Users', Users);
        response.status(200).json(Users);
    })
    .catch(error => {
        console.log(error);
        //handle the error
        response.status(500).json({ errorMessage: "The users information could not be retrieved."})
    })
})


//POST create a new user
server.post('/api/users', function(req, res) {
    const userData = req.body;

    Users.insert(userData)
    .then(user => {
        res.status(201).json(user);
    })
    .catch(error => {
        console.log(error);
        //handle the error, not sure if this is the proper way
        res.status(500).json({
            errorMessage: "There was an error while saving the user to the database" 
        });
    });

     //handling if name or bio is missing
     if (!userData.name || !userData.bio) {
        res.status(400).json({ errorMessage: "Please provide name and bio for the user."})
    }
});

//GET by id	/api/users/:id	Returns object by specific id.
server.get("/api/users/:id", function(request, response) {
    const id = req.params.id;

    Users.findById(id)
    .then(response => {
        if (!response) {
            res.status(404).json({ message: "The user with the specified ID does not exist." })
        }
        res.status(200).json(response);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({  errorMessage: "The user information could not be retrieved."});
    })
})



//DELETE user by id
server.delete('/api/users/:id', (req, res) => {
    const id = req.params.id;
   
    Users.remove(id)
    .then(result => {
        
        res.status(200).json(result);
    })
    .catch(err => {
        console.log(err)
        res.status(500).json({ errorMessage: "The user could not be removed" })
    })

    Users.findById(id)
    .then(findUser => {
        if (!findUser) {
            res.status(404).json({ message: "The user with the specified ID does not exist."});
        }
    })
})




//PUT  To update the user's data  by specific id. Modified user is returned

server.put('/api/users/:id', (req, res) => {
    const id = req.params.id;
    
    Users.findById(id)
    .then(findUser => {
        if (!findUser) {
            res.status(404).json({ message: "The user with the specified ID does not exist."});
        }
    })

    if (!req.body.name || !req.body.bio) {
        res.status(400).json({ errorMessage: "Please provide name and bio for the user."})
    }

    const name = req.body.name;
    const bio = req.body.bio;
    const sendObject = {name, bio};
    Users.update(id, sendObject)
    .then(updatedUser => {
        Users.findById(id)
        .then(response => {
            res.status(200).json(response);
        })
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({ errorMessage: "The user information could not be modified."} )
    })
})



//listening server 
const port = 8181;
server.listen(port, () => console.log('API ONLINE'));