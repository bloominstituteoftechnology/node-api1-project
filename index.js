// implement your API here
const express = require('express'); //similar to import express from 'express';
const Users = require('./data/db.js'); //etc 
const shortid = require('shortid');
const UsersInfo = [];
const server = express(); //links server and express as the same call

server.use(express.json()); //middleware that converts to json when data is returned from server

server.get('/', (req, res) => {
    res.status(200).json({ hello: "Node API project 1 is running"})
})
// server.get('/api/users', (req, res) => {
//     res.status(200).json({ Users })
// })

server.get('/api/users', (req, res) => {
    Users.find()
        .then(users => {
            console.log('Users', users);
            res.status(200).json(users); 
        })
        .catch(error => {
            console.log(error);
            res.status(500).json({
                errorMessage: 'Sorry there was an error fetching users',
            });
        });
});
 
server.post("/api/users", (req, res) => {
    const userInfo = req.body;
    userInfo.id = shortid.generate();
    UsersInfo.push(userInfo);

    res.status(201).json(userInfo);


})







const PORT = 5001;
server.listen(PORT, () => { 
        console.log(`\n **API is running on http://localhost:${PORT}**\n`)
    });