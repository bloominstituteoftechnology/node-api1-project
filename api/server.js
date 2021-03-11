// BUILD YOUR SERVER HERE

module.exports = {}; // EXPORT YOUR SERVER instead of {}

// IMPORTS AT THE TOP
const express = require('express');

// INSTANCE OF EXPRESS APP
const server = express();
const User = require('./users/model')

// GLOBAL MIDDLEWARE// request goes through this function before anything else
server.use(express.json());






// ENDPOINTS// end points handle requests that come in 


// [GET] / (Hello World endpoint)
server.get('/',(req,res) =>{
    res.json({hello:'world'});
})

// [GET] /api/users/:id (R of CRUD, fetch user by :id)
server.get('/api/user/:id', async (req,res) =>{
    const {id} =req.params;
    try {
        const user = await User.findById(id)
        if (user) {
            res.json(user)
        }
        else{
            res.status(404).json({messsage: 'bad id'})
        }
        res.json(user)
    } catch (err) {
        console.log(err)
        res.status(500).json({error:err})
    }
})

// [GET] /api/users (R of CRUD, fetch all users)

server.get('/api/user', async(req,res) =>{
    try {
        const users = await User.find()
        res.json(users);
    } catch (err) {
        console.log(err)
        res.status(500).json({ message: "The users information could not be retrieved" })
    }
})

// [POST] /api/users (C of CRUD, create new user from JSON payload)
server.post('/api/user', async (req,res) =>{
    const user =req.body;
    // console.log(user)
    if(!user.name || !user.bio){ //validation 
        res.status(400).json({message:'name and bio required'})
    } else{
        try {
            const newUser = await User.insert(user);//this returns a promise and we await that and the result is the newUser object
            res.status(201).json(newUser)
        } catch (err) {
            console.log(err,'error')
            res.status(500).json({ message: "There was an error while saving the user to the database" });
        }    
    }
})
// [PUT] /api/users/:id (U of CRUD, update user with :id using JSON payload)

server.put('/api/user/:id', async (req,res) =>{
    const {id} = req.params;
    const user = req.body;

    try{
        const updatedUser = await User.update(id,user);
        if(updatedUser){
            res.json(updatedUser)
        }else{
            res.status(404).json({ message: "The user with the specified ID does not exist" })
        }
    }catch(err){
        console.log(err,'error')
        res.status(500).json({ error: "The user information could not be modified" });
    }
    
})

server.patch('/api/user/:id', async (req,res) =>{
    const {id} = req.params;
    const user = req.body;

    try{
        const updatedUser = await User.modify(id,user);
        if(updatedUser){
            res.json(updatedUser)
        }else{
            res.status(404).json({ message: "The user with the specified ID does not exist" })
        }
    }catch(err){
        console.log(err,'error')
        res.status(500).json({ error: "The user with the specified ID does not exist" });
    }
    
})

// [DELETE] /api/users/:id (D of CRUD, remove user with :id)
server.delete('/api/user/:id', async(req,res) =>{
    const{id} =req.params;
    try {
        const user = await User.remove(id)
        if(user){
            res.json(user);
        }
        else{
            res.status(404).json({ message: "The user with the specified ID does not exist" })
        }
    } catch (err) {
        console.log(err,'error')
        res.status(500).json({ message: "The user could not be removed" });
    }
})
// EXPOSING THE SERVER TO OTHER MODULES
module.exports = server;