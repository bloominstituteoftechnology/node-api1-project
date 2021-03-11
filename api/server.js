// BUILD YOUR SERVER HERE

// Imports at top
const express = require('express');
const Users = require('./users/model.js');
//Instance of express app
const server = express();


// Endpoints

// [POST] /api/users
    server.post('/api/users',async (req,res) =>{
        const user = req.body;

        if(!user.name || !user.bio) {
            res.status(400).json({message:'Please provide name and bio for the user'});
        } else{
            try {
                const newUser = await Users.create(user);
                res.status(200).json(newUser);
            } catch(err) {
                console.log(err);
                res.status(500).json({message:'There was an error while saving the user to the database'});
            }
        }
    })

//[GET] /api/users
   server.get('/api/users', async (req,res) => {
       try {
           const users = await Users.findAll();
           res.status(200).json(users);
       } catch(err){
           res.status(500). json({ message:'The users information could not be retrieved'});
       }
   })

//[GET] api/users/:id
server.get('/api/users/:id', async (req,res) => {
    try {
        const users = await Users.id();
        res.status(200).json(users);
    } catch(err){
        res.status(500). json({ error: err.message});
    }
})


//[DELETE] api/users/:id
    server.delete('/api/users/:id', async (req, res) => {
        const { id } = req.params;

        try{
            const users = await users.delete(id);
            if (users) {
                res.status(200).json(users);
            } else {
                res.status(404). json({message: "The user with the specified ID does not exist"});
            }
        } catch (err) {
            res.status(500).json({ message: "The user could not be removed"});
        }
        
    })

//[PUT] api/users/:id
    server.put('/api/user/:id', async (req, res) =>{
        const { id } = req.params;
        const changes = req.body;

        if(!changes.name || changes.bio) {
            res.status(400).json({ message: "Please provide name and bio for user"});
        } else {
            try{
                const updatedUser = await Users.find.update(id, changes);
                if(updatedUser) {
                    res.status(200).json(updatedUser);
                } else {
                    res.status(400).json({ message:'unknown id' });
                }
            } catch (err){
                res.status(500).json({ message:"The user information could not be modified"});
            }
        }
    })

// EXPORT YOUR SERVER instead of {}
module.exports = server; 



