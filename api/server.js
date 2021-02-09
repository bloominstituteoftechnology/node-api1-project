// BUILD YOUR SERVER HERE
const express = require('express');
const generateID = require('shortid');

const server = express();
server.use(express.json());

let initializeUsers = [
{ id: generateID.generate(), name: 'Ed Carter', bio: 'hero' },
{ id: generateID.generate(), name: 'Mary Edwards', bio: 'super hero' },
]
//get all users
server.get('/api/users', (req,res)=>{
    res.status(200).json(initializeUsers)
})
//get a single user by id
server.get('/api/users/:id', (req,res)=>{
    const id = req.params.id;
    const user = initializeUsers.find((user)=> user.id === id);
    if(!user){
        res.status(404).json({message: `ID ${id} does not exist`})
    }else{
        res.status(200).json(user)
    }
})
//post a new user
server.post('/api/users', (req,res)=>{
    const {name,bio} = req.body;
    if(!name || !bio){
        res.status(404).json({message: 'Name and Bio required'})
    }else{
        const newUser = {id: generateID(), name, bio}
        initializeUsers.push(newUser)
        res.status(201).json(newUser)
    }
})

//delete a user

server.delete('/api/users/:id', (req,res)=>{
    const id = req.params.id;
    try{
        if(!initializeUsers.find(user=> user.id === id)){
            res.status(404).json({message: `User with ID ${id} not found`})
        }else{
            initializeUsers = initializeUsers.filter(user=> user.id !== id)
            res.status(200).json({message: `User ${id} has been deleted`})
        }
    }catch(e){
        res.status(500).json({message: `Server error ${e}`})
    }
})

//edit a user

server.put('/api/users/:id', (req,res)=>{
    const id = req.params.id;
    const {name, bio} = req.body;
    const indexOfUser = initializeUsers.findIndex((user=> user.id === id))

    try{
        if(indexOfUser != -1){
            initializeUsers[indexOfUser] = {id, name, bio}
            res.status(200).json({id,name,bio})
        }else{
            res.status(404).json({message: `No user with ID ${id}`})
        }
    }catch(e){
        res.status(500).json({message: `Server error ${e}`})
    }
})


server.use('*', (req,res)=>{
    res.status(404).json({messsage: '404 not found'})
})



module.exports = server; // EXPORT YOUR SERVER instead of {}
