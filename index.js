// implement your API here
const express = require('express'); 
const db = require('./data/db.js');
const server = express(); 

server.get('/', (req, res) => {
    res.send('Hello Node23!!!!');
});

server.get('/hubs', (req,res) => {
    db.find() 
    .then(hubs => {
        res.json(hubs);
    })
    .catch(err => {
        // res.send('An error, sorrrry.')
        res.json({error: 'failed to get hubs from db'})
    });
});

const port = 8000; 
server.listen(port, () => console.log('\n=== API on port 8000 ===\n'));

