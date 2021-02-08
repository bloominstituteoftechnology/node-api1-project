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
            res.status(201).json(user)
        } catch (error){
            res.status(500).json({message: "There was an error while saving the user to the database"})
        }
    }
})

module.exports = {server}; // EXPORT YOUR SERVER instead of {}
