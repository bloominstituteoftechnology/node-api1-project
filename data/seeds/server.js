//create instance of server and export 
const usersModel=require('../db');
const express=require('express');
 
var cors = require('cors')
const server=express();
 
//handle the request body 
server.use(express.json());
server.use(cors());

server.get('/',(req,res)=>{
    res.send({message:"Welcome to node api1 server"})
})

//get all users
server.get('/api/users',async (req,res)=>{
  try {
    const outputUsers = await usersModel.find(); 
    res.status(200).json(outputUsers)
  } catch (err) {
    res.status(500).send({error: err.message})
  }
})

//create a user
server.post('/api/users',async (req,res)=>{
    const newUser=req.body;
    if (!newUser.name || !newUser.bio){
        //when one or more of the property is missing
        //state 400 Bad request
        res.status(400).send({ errorMessage: "Please provide name and bio for the user." })
    }else{
    try {
        const createdUser= await usersModel.insert(newUser)
        res.status(201).json(createdUser)
    } catch (err) {
        res.status(500).json({ errorMessage: "There was an error while saving the user to the database" })
    }
    }
})

//get a specific user

server.get('/api/users/:id', async(req,res)=>{
    const id=req.params.id
    try {
        const outputUser= await usersModel.findById(id)
        if (outputUser){
            res.status(200).json(outputUser)
        }else{
            res.status(404).json({ message: "The user with the specified ID does not exist." })
        }
    } catch (err) {
        res.status(500).json({ errorMessage: "The user information could not be retrieved." })
    }
})

server.delete('/api/users/:id',async (req,res)=>{
  const id=req.params.id;
  try {
      const removed=await usersModel.remove(id);
      if (removed){
        res.status(200).json(removed);
      }else{
        res.status(404).json({ message: "The user with the specified ID does not exist." })
      }
  } catch (err) {
      res.status(500).json({ errorMessage: "The user could not be removed" })
  }
})
//put request for an id

server.put('/api/users/:id',async(req,res)=>{
    const id=req.params.id
    const updateUser=req.body
    if(!updateUser.name || !updateUser.bio){
        res.status(400).json({errorMessage: "Please provide name and bio for the user."})
    }else{
        try {
           const updated= await usersModel.update(id,updateUser) 
           if (updated){
               res.status(200).json({updated})
           }else {
               res.status(404).json({message: "The user with the specified ID does not exist." })
           }
        } catch (err) {
            res.status(500).json({errorMessage: "The user information could not be modified."})
        }
    }
})

module.exports=server