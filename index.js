// implement your API here
const express = require('express');
const server = express();

const db = require('./data/db')

server.use(express.json());

server.listen(4000, () => {
    console.log('listening on port 4k');
})


server.get('/', (req, res) => {
    res.send('Great success');
})
//R - CRUD
server.get('/users', (req, res) => {
    db.find()
    .then(users => {
        res.status(201).json({users})
    })
    .catch(err => {
        res.status(500).send({errorMessage: "The users information could not be retrieved." })
    })
})
//C -Create in CRUD
server.post('/users', (req, res) => {
    const userInfo = req.body;
    console.log(userInfo);

    db.insert(userInfo)
    .then(user => {
        res.status(201).json({success: true, user })
    })
    .catch(err => {
        res.status(400).json({errorMessage: "Please provide name and bio for the user."})
    })
})

server.put('/users/:id', (req, res) => {

})
