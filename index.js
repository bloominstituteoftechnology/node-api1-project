const express = require('express');
const shortid = require('shortid');
const server = express();

//this gives Express the functionality to read JSON-formatted data
server.use(express.json());

let users = [];
server.listen(5000, () => {
    console.log("\n ** SERVER STARTED **\n")
})

// POST request.../api/users
//Creates a user using the information sent inside the request body.

server.post('/api/users', (req, res) => {
    let user = req.body;
    
    user.id = shortid.generate();
    users.push(user);

    res.status(201).json(user);
});


// GET request.../api/users
//Returns an array users.

server.get('/api/users', (req, res) => {

    res.status(200).json(users);
})


// GET request.../api/users/:id
//Returns the user object with the specified id

server.get('/api/users/:id', (req, res) => {
    let userid = req.params.id;

    let getUser = users.filter(i => {
        return i.id === userid;
    })
    res.status(200).json(getUser);
})


// DELETE request.../api/users/:id
//Removes the user with the specified id and returns the deleted user

server.delete('/api/users/:id', (req, res) => {
    let userid = req.params.id;
    
    oldUser = users.filter(i => {
        return i.id === userid;
    })
    
    users = users.filter(i => {
        return i.id !== userid;
    })
    console.log("Updated user list: ", users);

    res.status(201).json(oldUser);
})



// PATCH request.../api/users/:id
//Updates the user with the specified id using data from the request body. Returns the modified user

server.put('/api/users/:id', (req, res) => {
    let userid = req.params.id;

    user = users.filter(i => {
        return i.id === userid;
    })
    console.log(user);
    user.username = req.username;
    users = users.filter(i => {
        return i.id !== userid;
    })
    users.push(user);

    res.status(200).json(user);
})

