// implement your API here

//http module 
// const http = require('http');

const express = require('express');

const server = express();

server.use(express.json());

//adding the model
const db = require('./data/db.js');

//get 
server.get('/', (req, res) => {
    res.send('Welcome!');
});

//GET all seed users => complete.
server.get('/api/users', (req, res) => {
    db.find()
    .then(users => {
        res.send(users)
    })
    .catch(error => {
        res.json({ error: "The users information could not be retrieved." });
        res.statusCode = 500;
    });
})

//GET specific user
server.get('/api/users/:id', (req, res) => {
    const { id } = req.params;
    db.findById(id)
    .then(user => {
        if(user){
            res.status(200).json(user);
        }
        else 
        {
            res.status(404).json({ message: "The user with the specified ID does not exist." });
        }
    })
    .catch(error => {
        console.log(error)
        res.status(500).json({ error: "The user information could not be retrieved." });
    });
})

//POST for users
server.post('/api/users', (req, res) => {
    const userInfo = req.body;
    db.insert(userInfo)
    .then(user => {
        // const { userInfo } = req.params;
        if(userInfo.name == null || userInfo.bio == null){
            res.status(400).json({ errorMessage: "Please provide name and bio for the user." });
        }
        else {
            res.status(201).json(user);
        }
        
    })
    .catch(error => {
        res.json({message: 'error in your post'});
        res.statusCode = 500;
    });
})

//PUT 
server.put('/api/users/:id', (req, res) => {
    const {id} = req.params;
    const userInfo = req.body;
    db.update(id, user)
    .then(user => {
        // if (id == null){
        //     res.status(404).json({ message: "The user with the specified ID does not exist." });
        // }
    
       if(userInfo.name == null || userInfo.bio == null){
        res.status(400).json({ errorMessage: "Please provide name and bio for the user." });
            if (id == null){
                res.status(404).json({ message: "The user with the specified ID does not exist." });
            }
       }
       else if(user !==null && userInfo !== null){
        res.status(200).json(user)
       }
      
       else{
        res.status(500).json({ error: "The user information could not be modified." });
       }
     
    })
    .catch(error => {
        res.json({ message: 'The user with the specified ID does not exist.' });
        res.statusCode = 500;
    });
})

//DELETE req.
server.delete('/api/users/:id', (req, res) => {
    const id = req.params.id;
    db.remove(id)
    .then(user => {
        if (user){
            res.status(200).json(user);
        }
        else{
            res.status(404).json({ message: "The user with the specified ID does not exist." });
        }
        
    })
    .catch(error => {
        res.status(500).json({ message: "The user with the specified ID does not exist." });
    });
    
})


//post 
const port = 5000;
server.listen(port, () => {
    console.log(`\n** API is running on ${port}! \n`);
})