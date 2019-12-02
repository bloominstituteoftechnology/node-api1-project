// implement your API here
const express = require('express');

const db = require('./data/db.js');

const server = express();


server.use(express.json());


//GET 
server.get('/api/users', (req, res) => {

    db.find()
    .then(users =>{
        res.status(200).json(users);
    })
    .catch( err => {
        console.log('error on GET /users', err);
        res.status(500).json({errorMessage: "The users information could not be retrieved."})
    })
});

//GET 

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
        console.log('error on GET /users', err);
        res.status(500).json({errorMessage: "The users information could not be retrieved."})
    })
});


//post
server.post('/api/users', (req, res) => {
    const users = req.body; 
    db.insert(users)
    .then(data => {
        if('name' === ' ' || 'bio' === ' '){
            res.status(400).json({ errorMessage: "Please provide name and bio for the user."})
        } else {
            res.status(201).json(data);
        }
    })
    .catch(err => {
        console.log('error on GET /api/users', err);
        res.status(500).json({errorMessage: "There was an error while saving to the database" });
    });
});

//delete







const port = 5000; 
server.listen(port, () => {
    console.log(`\n API running on port ${port} \n`);
});