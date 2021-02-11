// BUILD YOUR SERVER HERE
const express = require("express")
const data = require("./users/model")

const server = express()

server.use(express.json())
 
// Creating endpoints for our server
server.get("/api/users", async (req, res) => {
    const users = await data.find()
    if(users) {
        res.json(users)
    } else {
        res.status(500).json({ message: "The users information could not be retrieved" })
    }
});

server.get("/api/users/:id", async (req, res) => {
    const user = await data.findById(req.params.id)
    if(user) {
        res.json(user)
    } else {
        res.status(404).json({ message: "The user with the specified ID does not exist" })
    }
});

server.post("/api/users", async (req, res) => {
    const newUser = req.body;
    if(newUser.name && newUser.bio) {
        await data.insert(newUser.name, newUser.bio)
         return res.status(201).send("New user created with the following info", req.body)
    } else {
        res.status(400).json({ message: "Please provide name and bio for the user" })
    }

});

server.put("/api/users/:id", async (req, res) => {
    const user = data.findById(req.params.id);
    if(user) {
        if(req.body.name && req.body.bio) {
            await data.update(req.params.id, req.body);
            res.json("user info updated successfully")
        } else {
            res.status(400).json({ message: "Please provide name and bio for the user" })
        }
        
    } else {
        res.status(500).json({ message: "The user information could not be retrieved" })
    }
});

server.delete("/api/users/:id", async (req, res) => {
    const user = await data.findById(req.params.id);

    if(user) {
        await data.remove(req.params.id);
        res.json("user successfully removed from database")
    } else {
        res.status(404).json({ message: "The user with the specified ID does not exist" })
    }
});

module.exports = server; // EXPORT YOUR SERVER instead of {}