// Capturing Express
const express = require("express");

// Capturing Database Access
const db = require("./data/db");

// Creating an instance of express
const server = express();

// Get call to "/"
server.get("/", (req, res) => {
    res.status(200).json("API Running..."); 
});

//Get call for all users
server.get("/api/users", (req, res) => {
    db.find()
        .then(response => {
            res.status(200).json({ messsage: response });
        })
        .catch(error => {
            res.status(500).json({ message: error });
        });
});

// exporting server
module.exports = server;