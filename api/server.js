// BUILD YOUR SERVER HERE
//IMPORTS
const express = require("express")
const Users = require("../api/users/model")

//INSTANCE OF EXPRESS
const server = express()

//Global Middleware
server.use(express.json()) 


//ENDPOINTS

//POST request to create  users
server.post("/api/users", (req,res)=>{
    const newUser = req.body
    if(!newUser.name || !newUser.bio){
        res.status(400).json({message: "Please provide name and bio for the user"})
    }else{
        Users.insert(newUser)
            .then(user =>{
                res.json(user)
            })
            .catch(err =>{ err,
                res.status(500).json({message: "There was an error while saving the user to the database",})
            })
    }
})

//Get request to return all users
server.get("/api/users", (req,res)=>{
    Users.find()
        .then(users =>{
            res.json(users)
        })
        .catch(err =>{
            err, 
            res.status(500).json({ message: "The users information could not be retrieved" })
        } )
})

//GET request that returns a user with a specified ID
server.get("/api/users/:id", (req, res)=>{
    const idVar = req.params.id

    Users.findById(idVar)
        .then(user =>{
            if(!user){
                res.status(404).json({ message: "The user with the specified ID does not exist" })
            }else{
                res.json(user)
            }
        })
        .catch(err => { 
            err, 
            res.status(500).json({message: "The user information could not be retrieved"})
        })
})
//DELETE: Removes a user with a certain id
server.delete("/api/users/:id", async (req, res)=>{
    try{
        
        const {id} = req.params
        const deletedUser = await Users.remove(id)
        if(!deletedUser){
            res.status(404).json({ message: "The user with the specified ID does not exist" })
        }else{
            res.status(201).json(deletedUser)
        }
    }catch(err){
        err,
        res.status(500).json({ message: "The user could not be removed" })
    }

})

//PUT request updates the user with modified data.
server.put("/api/users/:id", async (req, res)=>{
        const {id} = req.params
        const changes = req.body

    try{
        
        if(!changes.name || !changes.bio){
            res.status(400).json({ message: "Please provide name and bio for the user" })        

        }else{
            const updatedUser = await Users.update(id, changes)
            
            if(!updatedUser){
                res.status(404).json({ message: "The user with the specified ID does not exist" })
            }else{
                res.status(200).json(updatedUser)
            } 
        }
    }catch(err){
        err,
        res.status(500).json({ message: "The user information could not be modified" })
    } 
    
    })

//Server Export
module.exports = server; // EXPORT YOUR SERVER instead of {}


