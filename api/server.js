// BUILD YOUR SERVER HERE
//importing express
const express = require("express")
//creates the server
const server = express()

//All funtions from model.js ar
const Users = require('../api/users/model.js')
//global midleware
server.use(express.json())

//ENDPOINTS
//[POST] /api/users | Creates a user using the information sent inside the `request body`
server.post("/api/users", (req,res)=>{
    const newUser = req.body
    if(!newUser.name || !newUser.bio){
        res.status(400).json({message:"Please provide name and bio for the user"})
    }else{
        Users.insert(newUser)
        .then(users=>{
            res.json(users)
        })
        .catch(err=>{
            res.status(500).json({message:err.message})
        })
    }
})

//[GET] /api/users | Returns an array users
server.get("/api/users", (req,res)=>{
    Users.find()
    .then(users =>{
        console.log(users)
        res.status(200).json(users)
    })
    .catch(err => {
        res.status(500).json({message:err.message})
    })
})

//[GET] /api/users/:id | Returns the user object with the specified `id`
server.get("/api/users/:id", (req,res)=>{
    const idVar = req.params.id
    Users.findById(idVar)
    .then(user =>{
        if(!user){
            res.status(404).json(`User ${idVar}does not exist`)        
        }else{
            res.json(user)
        }
    })
    .catch(err => {
        res.status(500).json({message:err.message})
    })
})

//[DELETE] /api/users/:id | Removes the user with the specified `id` and returns the deleted user
server.delete("/api/users/:id", (req,res)=>{
    try{
        const {id} = req.params
        const removeUser = await Users.remove(id)
        if(!removeUser){
            res.status(404).json({ message: "The user with the specified ID does not exist" })
        }else{
            res.status(201).json(removeUser)
        }        
    }catch(err){
        res.status(500).json(err)
    }
})

//[PUT] /api/users/:id | Updates the user with the specified `id` using data from the `request body`. Returns the modified user 

server.put("/api/users/:id", async (req,res) =>{
    const {id} = req.params
    const changes = req.body
    try{
        if(!changes.name || !changes.bio){
            res.status(400).json({ message: "Please provide name and bio for the user" })
        }else{
            const updatedUser = await Users.update(id, changes)
            if(!updatedUser){
                res.status(404).json({message:"The user with the specified ID does not exist"})
            }else{
                res.status(200).json(updatedUser)
            }
        }
    }catch(err){
        res.status(500).json({message:err.message})
    }
})

// [GET] / Hello World endpoint must go at the bottom.
//"*" works with any request
server.use("*", (req,res)=>{
    res.status(404).json({message:"Not Found"})
})

// EXPORT YOUR SERVER instead of {}
module.exports = server 
