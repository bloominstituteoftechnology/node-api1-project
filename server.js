// Capturing Express
const express = require("express");

// Capturing Database Access
const db = require("./data/db");

// Creating an instance of express
const server = express();

// Allows for server to communicate using JSON
server.use(express.json());

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
            res.status(500).json({ errorMessage: "The users infromation could not be retrieved." });
        });
});

// Get specific user by ID
server.get("/api/users/:id", (req, res) => {
    db.findById(req.params.id)
        .then(response => {
            response ? 
            res.status(200).json({ messsage: response }) 
            : res.status(404).json({ message: "The user with the specified ID does not exist." })
        })
        .catch(error => {
            res.status(500).json({ message: error });
        });
});

// Post Request
server.post("/api/users", (req, res) => {
    if( req.body.name && req.body.bio ) {
        db.insert(req.body)
            .then(response => {
                db.findById(response.id)
                    .then(response => {
                        res.status(201).json({ message: response })
                    })
                    .catch(err => {
                        console.log(error);
                    });
            })
            .catch(error => {
                res.status(500).json({ errorMessage: "There was an error saving the user to the database." })
            })
    } else {
        res.status(400).json({ errorMessage: "Please provide name and bio." });
    }
});

// Put Request
server.put("/api/users/:id", (req, res) => {
    if( req.body.name && req.body.bio ) {
        db.update(req.params.id, req.body)
            .then(response => {
                response ? 
                  db.findById(req.params.id)
                    .then(post => {
                        res.status(200).json({ messsage: post })
                    })
                    .catch(error => {
                        res.status(404).json({  message: "The user with the specified ID does not exist." })
                    })
                : res.status(500).json({ errorMessage: "The user information could not be modified." });
            })
            .catch(error => {
                res.status(500).json({ errorMessage: "The user information could not be modified." })
            })
    } else {
        res.status(400).json({ errorMessage: "Please provide name and bio." });
    }
});

// Delete Request
server.delete("/api/users/:id", (req, res) => {
    db.remove(req.params.id)
        .then(count => {
            count === 1 ?
            res.status(200).json({ messsage: `${count} users were removed from database.` })
            : db.findById(req.params.id)
                .then(response => {
                    response ? 
                        res.status(200).json({ messsage: response }) 
                        : res.status(404).json({ message: "The user with the specified ID does not exist." })
                })
                .catch(error => {
                    res.status(500).json({ message: error });
                });
        })
        .catch(error => {
            res.status(500).json({ errorMessage: "User could not me removed." })
        })
})

// exporting server
module.exports = server;