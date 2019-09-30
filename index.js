// implement your API here
const express = require('express');
const db = require('./data/db.js');
const server = express();

//middleware
server.use(express.json());
//request handler

server.get('/users',(req, res)=>{
    db.find()
    .then(users =>{
        res.json(users);
    })
    .catch(err =>{
        res.status(500).json({
            err: err
        })
    })
});

server.post('/users',(req, res)=>{
    const newUser = req.body;
    db.insert(newUser)
    .then(user =>{
        res.status(201).json(user);
    })
    .catch(err =>{
        res.status(500).json({
            err: err
        })
    })
});



server.listen(5000, () =>{
    console.log('server is running on port 5000...');
});