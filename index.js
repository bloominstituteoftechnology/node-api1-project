// implement your API here
const express = require('express'); 
const db = require('./data/db');
const server = express(); 

server.use(express.json()); //teaches express how to read json, needed for POST and PUT to work


server.get('/api/users', (req,res) => {
    db.find() 
    .then(users => {
        res.status(200).json(users);
    })
    .catch(error => {
        // res.send('An error, sorrrry.') --doing .json instead per today's lecture
        console.log('An error', error)
        res.status(500).json({errorMessage: "failed to get users from db"});
    });
});

server.post('/api/users', (req,res) => {
    user = {
        ...req.body,
    };
   
    db.insert(user)
    .then(users => {
        res.status(201).json(users);
    })
    .catch(error => {
        res.status(400).json({errorMessage: "Please provide name and bio for the user."});
    });
});

const port = 6000; 
server.listen(port, () => console.log('\n=== API on port 6000 ===\n'));



//in insomnia the post error came from not setting a header on the post side -- when you set it up, the name and bio you entered posted an id for the user