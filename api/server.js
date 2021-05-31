 //BUILD YOUR SERVER HERE
const express = require('express');
const server = express();
server.use(express.json());
const users = require('./users/model');
server.post("/api/users", async (req, res) => {
    try {
        if(!req.body.name || !req.body.bio) {
            res.status(400).json({message:"Please provide name and bio for the user"})
        }
        else {
            const insert = await users.insert(req.body)
            res.status(201).json(insert)
        }
    } catch (error) {
        res.status(500).json({ message: "There was an error while saving the user to the database", error:error.message})
    }
})
server.get("/api/users", async (req, res) => {
    try {
        const read = await users.find()
        res.status(200).json(read)
    } catch (error) {
        res.status(500).json({ message: "The users information could not be retrieved", error:error.message})
    }
})
 server.get("/api/users/:id", async (req, res) => {
     try {
        const readById = await users.findById(req.params.id)
        if(!readById){
            res.status(404).json({ message: "The user with the specified ID does not exist"})
        }
        else{
            res.json(readById)
        }
     } catch (error) {
            res.status(500).json({ message: "The user information could not be retrieved", error:error.message})
     }
 })
 server.delete("/api/users/:id",async(req,res)=>{
try {
    const remove = await users.remove(req.params.id)
    if(!remove){
return res.status(404).json({message:"The user with the specified ID does not exist"})
    }
    else{
      return  res.json(remove)
    }
} catch (error) {
    res.status(500).json({message:"The user could not be removed"})
}
 })
server.put("/api/users/:id",(req,res)=>{
    const update = users.update(req.params.id,req.body)
!req.body.name||!req.body.bio?res.status(400).json({message:"Please provide name and bio for the user"}) :update
.then((data)=>{
res.json(data)
})
.catch((err)=>{
    res.status(500).json({message:"The user information could not be modified",error:err.message})

})
})

module.exports = server;