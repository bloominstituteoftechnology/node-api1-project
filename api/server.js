// BUILD YOUR SERVER HERE
const Users = require('./users/model.js');
const express = require('express');
const server = express();

server.use(express.json());

server.get('/api/users', async (req, res) => {
    try {
        const users = await Users.find();
        res.status(200).json(users);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

server.get('/api/users/:id', async (req, res) => {
    const { id } = req.params;
    
    try {
        const user = await Users.findById(id);
        if(user){
            res.status(200).json(user);
        }
        else {
            res.status(404).json({message : "User Not Found"})
        }
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

server.post('/api/users/', async (req, res) => {
    const user = req.body;
    
    if(!user.name || !user.bio){
        res.status(400).json({message : "Must include Name and Bio"})
    }
    else{
        try {
            const newUser = await Users.insert(user);
            res.status(201).json(newUser);
        }
        catch(err) {
            res.status(500).json({ error : err.message })
        }
    }
});

server.delete('/api/users/:id', async (req, res) => {
    const { id } = req.params;
    try{
        const user = await Users.remove(id);
        if(user){
            res.status(200).json({ message : `${id} was deleted.`})
        }
        else{
            res.status(404).json({message : "User Not Found"})
        }
    }
    catch(err){
        res.status(500).json({ message : `User could not be removed.`, error : err.message })
    }
})



module.exports = server; // EXPORT YOUR SERVER instead of {}
