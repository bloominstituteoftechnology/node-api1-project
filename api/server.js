// BUILD YOUR SERVER HERE
const express = require("express")
const server = express();
server.use(express.json());
let user = require('./users/model')

server.post("/server/user", async (req,res)=>{
    const user = req.body
    if(!user.name || !user.bio) {
        res.status(400).json({message: "Please provide name and bio for the user" })
    }else {
        try {
            const newUser = await User.create(user)
            res.status(201).json(newUser)
        } catch (error){
            res.status(500).json({message: "There was an error while saving the user to the database"})
        }
    }
})

server.get("/server/user/:id", (req,res)=>{
    const id = req.params
    User.findById(id)
    .then(user => {
      user ? res.status(200).json(user) : res.status(404).json({message: `The user with the specifiec ${id} does not exist`})
    })
    .catch(error => {
        res.status(500).json({message: "The user information could not be retrieved"})
    })
})

server.get("/server/user", (req,res)=>{
    res.status(500).json({message: "The users infomation could not be retrieved"})
})

module.exports = {server}; // EXPORT YOUR SERVER instead of {}
