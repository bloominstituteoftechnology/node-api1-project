const express = require("express");
const shortid = require('shortid');


const server = express();
const PORT = 5000;

const users = [];

// Middleware
server.use(express.json());


// ENDPOINTS

// API Main Endpoint
server.get("/", (req, res) => {
	res.json({ api: "running.." });
});

//POST Request to add user
server.post('/api/users', (req, res)=>{
    const body = req.body;
    console.log(body)
    // Check if name or bio exists
    // if name or bio arent in the body variable, display an error message with 400 status
    if (!('name' in body) || !('bio' in body)){
        res.status(400).json({ errorMessage: "Please provide name and bio for the user." });
    } 

    // Add random ID to body
    body['id'] = shortid.generate();

    // Add new user to the users variable and return 201 with the users variable
    try {
        users.push(body);
        res.status(201).json(users);
    } catch (error) {
        res.status(500).json({ errorMessage: "There was an error while saving the user to the database" });
    }
    
})

// GET all users
server.get('/api/users', (req,res)=>{
    try {
        res.status(200).json(users);
    }catch (error) {
        res.status(500).json({ errorMessage: "The users information could not be retrieved." });
    }
})



// Server Listener
server.listen(PORT, () => console.log(`!!!!! === listening on ${PORT} === !!!!!`));