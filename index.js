// implement your API here
const express = require('express'); 
const db = require('./data/db');
const server = express(); 

server.use(express.json()); //teaches express how to read json, needed for POST and PUT to work

// server.get('/', (req, res) => {
//     res.send('Node API1 Project, Ahoy!');
// });

server.get('/api/users', (req,res) => {
    db.find() 
    .then(users => {
        res.status(200).json(users);
    })
    .catch(err => {
        // res.send('An error, sorrrry.') --doing .json instead per today's lecture
        res.status(500).json({errorMessage: "failed to get users from db"});
    });
});

server.post('/api/users', (res,req) => {
    db.insert()
    .then(users => {
        res.status(200).json(users);
    })
    .catch(err => {
        res.status(400).json({errorMessage: "Please provide name and bio for the user."});
    });
});

const port = 7000; 
server.listen(port, () => console.log('\n=== API on port 7000 ===\n'));

