// BUILD YOUR SERVER HERE
const express = require("express")
const User = require("./users/model")

//Initialize Express
const server = express()

//Middleware
server.use(express.json())

//Endpoints
//Get all users
server.get("/api/users", (req, res)=>{
    User.find()
        .then(users => {
            // console.log(users)
            res.status(200).json(users)
        })
        .catch(err => {
            res.status(500).json ({message: err.message})
        })
})

//Get user by :id
server.get("/api/users/:id", (req, res)=>{
    const {id} = req.params
    User.findById(id)
        .then(user => {
            if(!user){
                res.status(404).json("does not exist")
            }else{
                res.status(200).json(user)
            }
        })
        .catch(err =>{
            res.status(500).json({message: err.message})
        })
})

//Post new user
server.post("/api/users", (req, res)=>{
    const newUser = req.body
    // console.log(newUser.name, newUser.bio)
    if(!newUser.name || !newUser.bio){
        res.status(400).json("provide name and bio")
    }else{
        User.insert(newUser)
        .then(user=>{
            res.status(201).json(user)
        })
        .catch(err => {
            res.status(500).json ({message: err.message})
        })
    }
})

//Updating user 
server.put("/api/users/:id", async (req, res)=>{
    const {id} = req.params
    const changes = req.body

    try{
        if(!changes.name || !changes.bio){
            res.status(400).json("provide name and bio")
        }else{
            const updatedUser = await User.update(id, changes)
            if(!updatedUser){
                res.status(404).json("User does not exist")
            }else{
                res.status(201).json(updatedUser)
            }
        }
    }catch(err){
        res.status(500).json ({message: err.message})
    }
})

//Delete user
server.delete("/api/users/:id", async (req, res)=>{
    
    try{
        const {id} = req.params
        const deletedUser = await User.remove(id)
        if(!deletedUser){
            res.status(404).json("User does not exist")
        }else{
            res.status(201).json(deletedUser)
        }
    }catch(err){
        res.status(500).json ({message: err.message})
    }
})



//Catch All
server.use("*", (req,res)=>{
    res.status(404).json({message: "Page Not Found"})
})

module.exports = server; // EXPORT YOUR SERVER instead of {}
