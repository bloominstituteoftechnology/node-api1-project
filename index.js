// implement your API here
const express = require('express');

const server = express();

server.use(express.json());

//adding the model
const db = require('./data/db.js');

//get 
server.get('/', (req, res) => {
    res.send('Welcome!');
});

//get all seed users
server.get('/api/users', (req, res) => {
    db.find()
    .then(users => {
        res.send(users)
    })
    .catch(error => {
        res.send(error, 'error in the get request');
    });
})






//port 
const port = 5000;
server.listen(port, () => {
    console.log(`\n** API is running on ${port}! \n`);
})