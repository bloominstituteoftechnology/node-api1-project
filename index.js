const express = require('express');
const shortid = require('shortid')

const server= express();

server.use(express.json())

let users= [];

server.get('/', (req, res)=>{
    res.json({message:"hello"})
});

server.post('/api/users', (req,res) => {
    const userInfo = req.body;

    userInfo.id=shortid.generate();
    users.push(userInfo);
    res.status(201).json(userInfo);
});

server.get('/api/users', (req,res) => {
    const {id} = req.params;

    const found= users.find(user => user.id === id)
    if (found) {
    res.status(200).json(found)
    }else{
        res.status(404).json({message:"not found"})
    }
    
});

server.get('/api/users/:id', (req,res) => {
    
    res.status(200).json(users);
});

server.delete( '/api/users/:id',(req,res) =>{
    const {id} = req.params;
    console.log(id);

    const found= users.find(user => user.id === id)
    if (found) {
        users= users.filter(user => user.id !== id)
    res.status(200).json(found)
    }else{
        res.status(404).json({message:"not found"})
    }
})

server.patch("/api/users/:id",(req, res) => {
    const {id} = req.params;
    const changes = req.body;

    let found = users.find(use => use.id === id);

    if (found) {
        Object.assign(found, changes);
        res.status(200).json(found)
    } else {
        res.status(404).json({message:"user not found"})
    }
})

const PORT = 5000;

server.listen(PORT, () =>{
    console.log (`listening on http://localhost:${PORT}`)
})