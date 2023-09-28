// BUILD YOUR SERVER HERE
const express = require("express");
const Data = require("./users/model.js")
const server = express();

server.use(express.json()); 
//!get
server.get("/api/users",async(req,res)=> {
    try {
        const users = await Data.find();
        res.status(200).json(users); 
    } catch (err) {
        res.status(500).json({ message: "The users information could not be retrieved" })
    }
})
server.get("/api/users/:id",async(req,res)=> {
    try {
        const {id} = req.params;
        const userById = await Data.findById(id);
        if (!userById) {
            res.status(404).json({ message: "The user with the specified ID does not exist" })
        } else {
            res.status(200).json(userById)
        }
    } catch {
        res.status(500).json({ message: "The user could not be removed" })
    }
})
//!get
//!post
server.post("/api/users",async(req,res)=> {
    try {
        const {name, bio} = req.body;
        if (!name || !bio) {
            res.status(400).json({ message: "Please provide name and bio for the user" });
        } else {
            const newUser = await Data.insert({name : name,bio :bio});
            res.status(201).json(newUser)
        }
    } catch {
        res.status(500).json({ message: "There was an error while saving the user to the database" })
    }
})
//!post
//!delete
server.delete("/api/users/:id",async(req,res)=> {
    try {
        const {id} = req.params;
        const deletedUser = await Data.remove(id);
        if (!deletedUser) {
            res.status(404).json({ message: "The user with the specified ID does not exist" });
        } else {
            res.status(200).json(deletedUser); 
        }
    } catch {

    }
})
//!delete
module.exports = server; // EXPORT YOUR SERVER instead of {}
