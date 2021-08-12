// BUILD YOUR SERVER HERE
const express = require("express")
const User = require("./users/model.js")

const server = express()
server.use(express.json())


//endpoints
server.get("/api/users",(req,res)=>{
    User.find()
        .then(users =>{
            console.log(users)
            res.status(200).json(users)
        })
        .catch(err=>{
            res.status(500).json({message:err.message})
        })
})

// [GET] /api/dogs/:id (R of CRUD, fetch dog by :id)
server.get("/api/users/:id",(req,res)=>{
    const idVar = req.params.id
    User.findById(idVar)
        .then(user=>{
            if(!user){
                res.status(404).json(`User ${idVar} does not exist`)
            }else{
                res.json(user)
            }            
        })
        .catch(err=>{
            res.status(500).json({message:err.message})
        })
})
// [POST] /api/dogs (C of CRUD, create new dog from JSON payload)
server.post("/api/users", (req,res)=>{
    const newUser = req.body
    if(!newUser.name || !newUser.bio){
        res.status(422).json({message:"Name and bio are required"})
    }else{
        User.insert(newUser)
        .then(user=>{
            res.json(user)
        })
        .catch(err=>{
            res.status(500).json({message:err.message})
        })
    }    
})
// [PUT] /api/dogs/:id (U of CRUD, update dog with :id using JSON payload)
server.put("/api/users/:id", async (req,res)=>{
    const {id} = req.params
    const changes = req.body
    try{
        if(!changes.name || !changes.bio){
            res.status(422).json({message:"Name and bio required"})
        }else{
            const updatedUser = await User.update(id,changes)
            if(!updatedUser){
                res.status(404).json("Dog doesn't exist")
            }else{
                res.status(200).json(updatedUser)
            }
        }        
    }catch(err){
        res.status(500).json({message:err.message})
    }
})

// [DELETE] /api/dogs/:id (D of CRUD, remove dog with :id)
server.delete("/api/users/:id", async (req,res)=>{
    try{
        //throw "ERROR AHH!"
        const {id} = req.params
        const deletedUser = await User.remove(id)
        if(!deletedUser){
            res.status(404).json("Dog doesn't exist")
        }else{
            res.status(201).json(deletedUser)
        }        
    }catch(err){
        res.status(500).json(err)
    }
})


module.exports = server; // EXPORT YOUR SERVER instead of {}
