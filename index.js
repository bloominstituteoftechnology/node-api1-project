const { json } = require('express');
const express = require('express');

const server = express();

server.use(express.json());

let userArray = [
    {
        id: 0, 
        name: "Jane Doe", 
        bio: "Not Tarzan's Wife, another Jane",
    },
]

let nextId = userArray.length;

server.post('/api/users', (req, res) => {
    const {body} = req;
    
    if (body.name && body.bio){
        userArray.push({id: nextId++, ...body});
        return res.status(201).json({data: userArray});
    } 
    
    return res.status(400).json({message: 'Please include name and bio for user.'});
    
})

server.get('/api/users', (req, res) => {
    res.status(200).json({data: userArray});
})

server.get('/api/users/:id', (req, res) => {
    const id = Number(req.params.id);
    const found = userArray.find(user => user.id === id);

    if (!found) return res.status(404).json({message: 'User with specified ID not found.'});
    
    return res.status(200).json({data: found});
})

server.delete('/api/users/:id', (req, res) => {
    const id = Number(req.params.id);
    const found = userArray.find(user => user.id === id);

    if (!found) return res.status(404).json({message: 'User with specified ID not found.'});

    userArray = userArray.filter(item => item.id !== id);
    return res.status(201).json({data: userArray});
})

server.put('/api/users/:id', (req, res) => {
    const {body} = req;
    const {name, bio} = body;
    const id = Number(req.params.id);
    let found = userArray.find(user => user.id === id);

    if (!found) return res.status(404).json({message: 'User with specified ID not found.'});

    Object.assign(found, body);

    if (name && bio){
        found = {...found, name, bio};
        return res.status(200).json({data: found});
    } 
        
    return res.status(400).json({message: 'Please include name and bio for user.'});
})

const PORT = 5000;

server.listen(PORT, () => console.log("Server has been started."));