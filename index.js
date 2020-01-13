// implement your API here

const express = require("express"); 

const Users = require("./data/db.js");

const server = express();

server.use(express.json());

// GET users "/api/users"
server.get("/api/users", (req, res) => {
    Users.find()
    .then(users => {
        res
            .status(200)
            .json(users)
    })
    .catch(error => {
        console.log(error)
        res
            .status(500)
            .json({ 
                errorMessage: "The users information could not be retrieved."
            });
    })
})

// GET users by id "/api/users/:id"
server.get("/api/users/:id", (req, res) => {
    const id = req.params.id
    Users.findById(id)
    .then(users => {
        res
            .status(200)
            .json(users)
    })
    .catch(error => {
        console.log(error)
        res
            .status(404)
            .json({ 
                message: "The user with the specified ID does not exist." 
            })
            .status(500)
            .json({ 
                errorMessage: "The user information could not be retrieved." 
            });
    })
})


// POST users "/api/users"
server.post("/api/users", (req, res) => {
    const userData = req.body;
    Users.insert(userData)
    .then(user => {
        res
            .status(201)
            .json(user)
    })
    .catch(error => {
        console.log(error)
        res 
            .status(400)
            .json({
                errorMessage: "Please provide name and bio for the user."
            })
            .status(500)
            .json({
                errorMessage: "There was an error while saving the user to the database."
            })
    })
})

// DELETE user "/api/users/:id"
server.delete("/api/users/:id", (req, res) => {
    const id = req.params.id;
    Users.remove(id)
    .then(deleted => {
        res 
            .status(200)
            .json(deleted)
    })
    .catch(error => {
        console.log(error)
        res 
            .status(404)
            .json({
                message: "The user with the specified ID does not exist." 
            })
            .status(500)
            .json({
                errorMessage: "The user could not be removed."
            })
    })
})

// PUT user "/api/users/:id"
server.put("/api/users/:id", (req, res) => {
    const id = req.params.id;
    const userData = req.body;
    console.log(id, userData)
    Users.update(id, userData)
    .then(updated => {
        res
            .status(200)
            .json(updated)
    })
    .catch(error => {
        console.log(error)
        res 
            .status(404)
            .json({
                message: "The user with the specified ID does not exist." 
            })
            .status(400)
            .json({
                errorMessage: "Please provide name and bio for the user."
            })
            .status(500)
            .json({
                errorMessage: "The user information could not be modified."
            })
    })
})


const port = 8000;
server.listen(port, () => console.log(`\n ** API on port: ${port} **`))



