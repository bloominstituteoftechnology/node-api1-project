// BUILD YOUR SERVER HERE
const express = require('express');
const users = require('./users/model');

const server = express();

server.use(express.json());

server.get('/api/users', (req,res) => {
    users.find()
        .then(u => {
            console.log(u)
            res.status(200).json(u)
        })
        .catch(() => {
            res.status(500).json({message:'The users information could not be retrieved'})
        })
})

server.get('/api/users/:id', (req,res) => {
    const id = req.params.id
    users.findById(id)
        .then(u => {
            u ? res.status(200).json(u): res.status(404).json('The user with the specified ID does not exist')
        })
        .catch(() => {
            res.status(500).json({message:'The user information could not be retrieved'})
        })
})

server.post('/api/users', (req,res) => {
    const newUser = req.body;
    if(!newUser.name || !newUser.bio){
        res.status(400).json({ message: "Please provide name and bio for the user" })
    }
    else{
        users.insert(newUser)
            .then(u => {
                res.status(201).json(u)
            })
            .catch(() => {
                res.status(500).json({message:'There was an error while saving the user to the database'})
            })
    }
})

server.put('/api/users/:id', async (req,res) => {
    const id = req.params.id;
    const update = req.body;
     
    try{
        if(!update.name || !update.bio){
            res.status(400).json('Please provide name and bio for the user')
        }
        else{
            const updatedUser = await users.update(id, update)
            if(!updatedUser){
                res.status(404).json("The user with the specified ID does not exist")
            }
            else{
                res.status(200).json(updatedUser)
            }
        }
    }
    catch(err){
        res.status(500).json({message:'The user information could not be modified'})
    }
})

server.delete('/api/users/:id', (req,res) => {
    const id = req.params.id;
    users.remove(id)
        .then(u => {
            u ? res.status(201).json(u) : res.status(404).json("The user with the specified ID does not exist")
        })
        .catch(() => {
            res.status(500).json({message: 'The user could not be removed'})
        })
})
module.exports = server; // EXPORT YOUR SERVER instead of {}
