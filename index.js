// implement your API here
const express = require('express');

const db = require('./data/db.js');

const server = express();


server.use(express.json());


//GET request
server.get('/api/users', (req, res) => {

    db.find()
    .then(users =>{
        res.status(200).json(users);
    })
    .catch( err => {
        console.log('error on GET/api/users', err);
        res.status(500).json({errorMessage: "The users information could not be retrieved."})
    })
});

//GET by Id request

server.get('/api/users/:id', (req, res) => {
    const id = req.params.id;
    db.findById(id)
    .then(users =>{
      if (users){
        res.status(200).json(users);
      } else { 
          res.status(404).json({ message: "The user with the specified ID does not exist." })
      };
    })
    .catch( err => {
        console.log('error on GET/api/users/:id', err);
        res.status(500).json({errorMessage: "The users information could not be retrieved."})
    })
});


//POST requst
server.post('/api/users', (req, res) => {
    const users = req.body; 
    db.insert(users)
    .then(data => {
        if("name" || "bio" === ""){
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

//DELETE request
server.delete('/api/users/:id', (req, res) => {
    const id = req.params.id;
    db.remove(id)
    .then(removed => {
        if(removed){
            res.status(200).json({ message: 'user removed successfully.', removed});
        } else {
            res.status(404).json({ message: "The user with the specified ID does not exist."});
        }
    })
    .catch(err => {
        console.log('error on DELETE/api/users/:id', err);
        res.status(500).json({errorMessage: "The user could not be removed"});
    });
});

//PUT request
server.put('/api/users/:id', (req, res) => {
 const user = req.body;
 const id = req.params.id;
 db.findById(id)

    .then(users =>{
    if (users){
        res.status(200).json(users);
    } else { 
        res.status(404).json({ message: "The user with the specified ID does not exist." })
    };
    })
    if (user.name && user.bio) {
        db.update(id, user)
        .then(user => {
            res.status(200).json(user);
        }) 
        .catch(err => {
            console.log('error on PUT/api/users/:id', err);
            res.status(500).json({ errorMessage: "The information could not be modified"});
        });
    } else if (!user.id) {
        res.status(404).json({message: "The user with the specified ID does not exist."});
    }
    else {
        res.status(400).json({ errorMessage: "Please provide name and bio for the user."});
    }
});


const port = 5000; 
server.listen(port, () => {
    console.log(`\n API running on port ${port} \n`);
});