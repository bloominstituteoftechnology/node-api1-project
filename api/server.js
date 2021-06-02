// BUILD YOUR SERVER HERE

// IMPORTS AT THE TOP
const express = require("express")
const User = require("./users/model.js");
//const {find, findById, update, insert, remove} = require("./dog-model.js")

// INSTANCE OF EXPRESS APP
const server = express()

// GLOBAL MIDDLEWARE
server.use(express.json())

// ENDPOINTS

// [GET] /api/users  ----> returns array of users [Read of CRUD, fetch all users]
server.get("/api/users", (req,res)=> {
    User.find()
        .then(users =>{
            console.log(users)
            res.status(200).json(users)
        })
        .catch(err=>{
            res.status(500).json({message:err.message})
        })
});

// [GET] /api/users/:id ----> returns user object with the specified id [Also Read of CRUD, fetch user by id]
server.get("/api/users/:id", (req,res)=>{
    // const idVar = req.params.id // simple way to write it
    const {idVar} = req.params
    User.findById(idVar)
        .then(user =>{
            if(!user){
                res.status(404).json("User not found")
            }else{
                res.json(user)
            }
        })
        .catch(err=>{
            res.status(500).json({message:err.message})
        })
})

// [POST] /api/users ----> creates a user using info sent in the request body [Create of CRUD, create user]
server.post("/api/users", (req,res)=>{
    const newUser = req.body
    console.log("newUser:", newUser);
    if(!newUser.name || !newUser.bio){
        res.status(422).json("Need user name and bio")
    }else{
        User.insert(newUser)
        .then(user=>{
            res.status(201).json(user)
        })
        .catch(err=>{
            res.status(500).json({message:err.message})
            
        })
    }
})

// [PUT] /api/users/:id ----> updates user with the specified id using data fr the req body. Returns the modified user [Update of CRUD, mod user]
server.put("/api/users/:id", async (req,res)=>{
    const {id} = req.params;
    const changes = req.body;
    try{
        if(!changes.name || !changes.bio){
            res.status(422).json({message:"need name and bio"})
        }else{
            const updatedUser = await User.update(id, changes)
            if(!updatedUser){
                res.status(404).json("User not found")
            }else{
                res.status(200).json(updatedUser)
            }
        }
    }catch(err){
        res.status(500).json({message:err.message})
    }
})

// [DELETE] /api/users/:id ----> removes user with the specified id, returns deleted user [Delete of CRUD, delete user]
server.delete("/api/users/:id", async (req,res)=>{
    try{

        const {id} = req.params
        const deletedUser = await User.remove(id)
        if(!deletedUser){
            res.status(404).json("User not found")
        }else{
            res.status(200).json(deletedUser)
        }
    }catch(err){
        res.status(500).json({message:err.message})
    }
})

// [GET] / (Hello World endpoint)
server.use("*",(req,res)=>{
    console.log("server is running on port 5000")
    res.status(404).json({message:"404 Not Found!!!"})
})

// EXPORT YOUR SERVER TO OTHER MODULES
module.exports = server; 

