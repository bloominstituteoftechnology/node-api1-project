// implement your API here
const express = require('express'); 
const db = require('./data/db.js');
const server = express(); 

server.use(express.json()); //teaches express how to read json, needed for POST and PUT to work

// server.get('/', (req, res) => {
//     res.send('Node API1 Project, Ahoy!');
// });

server.get('/api/users', (req,res) => {
    db.find() 
    .then(users => {
        res.json(users);
    })
    .catch(err => {
        // res.send('An error, sorrrry.') --doing .json instead per today's lecture
        res.json({error: 'failed to get lambda from db'});
    });
});

server.post('/lambda', (res,req) => {
    const lambdaInfo = req.body;

    db.insert(lambdaInfo)
    .then(lambda => {
        res.json(lambda);
    })
    .catch(err => {
        res.json({error: 'failed to insert lambda from db'});
    });
});

const port = 7000; 
server.listen(port, () => console.log('\n=== API on port 7000 ===\n'));

