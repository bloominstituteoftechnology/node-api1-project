const express = require("express")
const server = express()
const db = require("./users/model")
server.use(express.json()) //< --must include to parse from JSON


server.get("/", (req, res) => {
    res.json({ message: "Lambda 5000 webpt24. Yo, World!" })
})


server.get("/api/users", (req, res) => {
    const users = db.find()
   if (users){
        res.json(users)
   } else {
       res.status(500).json({message: "The users information could not be retrieved",})
   }
})


server.get("/api/users/:id", (req, res) => {
    const user = db.findById(req.params.id)
    if(user) {
    res.json(user)
    } else if (!user){
        res.status(404).json({
            message: "The user with the specified ID does not exist",
        })
    } else {
        res.status(500).json({ message: "The user information could not be retrieved", })
    }
})



server.post("/api/users/", (req, res) => {
    const newUser = db.insert({
       
        name: req.body.name, 
        bio: req.body.bio,
    })
    if (newUser){ 
        res.status(201).json(newUser);
    } else if ( !newUser.name && !newUser.bio) {
        res.status(400).json({ message : "please provide name and bio for the user"})
    } else {
        res.status(500).json({ message: "There was an error while saving the user to the database"})
    }

})


server.put("/api/users/:id", (req, res) =>{
    const user = db.findById(req.params.id)
    if (user) {
        //update the user
        const updatedUser = db.update(user.id, {
        name: req.body.name || updatedUser.name,
        bio: req.body.bio || updatedUser.bio,
        })
        res.json(updatedUser)
    } else if (!user ){
        res.status(404).json({
            message: "The user with the specified ID does not exist",
        })
    } else {
        res.status(500).json({message: "The user information could not be modified"})
    }
})


server.delete("/api/users/:id", (req, res) =>{
    const user = db.findById(req.params.id)
    if (user) {
        //update the user
        db.remove(user.id)
        res.status(204).end
    } else if (!user){
        res.status(404).json({
            message: "The user with the specified ID does not exist",
        })
    } else {
        res.status(500).json({message : "The user information could not be modified"})
    }
})
module.exports = server

