// implement your API here
const express = require('express');
const db = require('./data/db.js');
const server = express();

server.use(express.json());

server.get('/', (req, res)=>{
    res.send('LambdaSchool Project')
});

server.post('api/users', (req, res)=>{
    const userInfo = req.body;

    console.log("user info", userInfo);
    if (!userInfo.name || !userInfo.bio) {
        res.status(400).json({errorMessage: "Name and bio needed"})
        console.log("400 please provide name and bio for the user")
    }else{
        db.insert(userInfo)
        .then(user =>{
            res.status(201).json(user)
        })
        .catch(err=>{
            console.log(err)
            res.status(500).json({error: 'Error while saving the user to the database'})
        })
    }
});

server.get('api/users')


const port = 8000;
server.listen(port, ()=> console.log('/n=== API on Port 8000'));