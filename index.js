const express = require('express');
const server = express();
const db = require('./data');

server.use(express.json())

//post user 
server.post('/users', (req,res) => {
    if(req.body.name && req.body.bio){
        const newUser = db.createUser({
            name: req.body.name,
            bio: req.body.bio,
        })
        const users = db.getUsers()
        if(users){
            res.json(users)
            res.status(201)
        }
        else{
            res.status(500).json({errorMessage: "encountered error while saving user info"})
        }}
        else{
            res.status(400).json({errorMessage: "please provide user credentials"})
        }
    }
);

//get user array
server.get('/users', (req, res) => {
    const users = db.getUsers()
    if(users){
        res.json(users)
    }
    else{
        res.status(500).json({errorMessage: "unable to find users"})
    }
});

//get user by id 
server.get('/users/:id', (req, res) => {
    const id = req.params.id
    const user = db.getUserById(id)
    if (user){
        //try{
            res.json(user)
        //}
    }
    else{
        res.status(404).status({errorMessage: "user does not exist"})
    }
})


//delete user by id
server.delete('/users/:id', (req, res) => {
    const id = req.params.id
    const user = db.getUserById(id)

    if(!user){
        res.status(404).json({errorMessage: "unable to find user"})
    }
    else{
        try{
            db.deleteUser(id)
            const users = db.getUsers()
            res.json(users)
        }
    catch(err){
        res.status(500).json({errorMessage: "encountered an error"})
    }}
})

//put user by id
server.put('/users/:id', (req, res) => {
    const id = req.params.id;
    const user = db.getUserById(id)
    if(!user){
        res.status(404).json({errorMessage: "unable to find user with that ID"})
    }
    else{
        if(req.body.name && req.body.bio){
            try{
                const updatedUser = db.updateUser(id, {
                    name: req.body.name,
                    bio: req.body.bio
                })
                res.json(updatedUser)
            }
            catch{
                res.status(500).json({ errorMessage: "The user information could not be modified." })
            }
        }        
    else{
            res.status(400).json({errorMessage: "enter user information"})
        }
    }}
);

server.listen(4000, () => {
    console.log('server running on localhost:4000')
});