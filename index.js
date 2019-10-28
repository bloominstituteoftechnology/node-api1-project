// implement your API here
const express = require('express'); 
const db = require('./data/db.js');
const server = express(); 

server.get('/', (req, res) => {
    res.send('Node API1 Project, Ahoy!');
});

server.get('/lambda', (req,res) => {
    db.find() 
    .then(lambda => {
        res.json(lambda);
    })
    .catch(err => {
        // res.send('An error, sorrrry.') --doing .json instead per today's lecture
        res.json({error: 'failed to get lambda from db'})
    });
});

const port = 9000; 
server.listen(port, () => console.log('\n=== API on port 9000 ===\n'));

