// implement your API here
//import express from 'express; ES2015 module syntax
const express = require('express'); // CommonJS modules
const db = require('./data/db.js'); 
const server = express();
//For middleware
server.use(express.json());

// routes or endpoints

// See a list of Data
server.get('/api/users', (req, res) => {
   
    db.find() //Returns a promise
        .then(users => {
            res.status(200).json(users)
        })
        .catch(error => {
            console.log(error)
            //handle errors
            res.status(500).json({ errorMessage: "The user info cannot be retrieved" })
        })
})
// Get ID
// server.get('/api/users/:id', (req, res) => {
//     const id = req.params.id;
//     Data.findById(id) //Returns a promise
//         .then(users => {
//             res.status(200).json(users)
//         })
//         .catch(error => {
//             console.log(error)
//             //handle errors
//             res.status(500).json({ error: "The user info cannot be retrieved" })
//         })
// })
// Create a Get Req

server.get('/api/users/:id', (req, res) => {
    const id = req.params.id;
    db.findById(id) //Returns a promise
        .then(users => {
            res.status(200).json(users)
        })
        .catch(error => {
            console.log(error)
            //handle errors
            res.status(404).json({ error: "The user with the specified ID does not exist." })
        })
})

// // Create a Post
server.post('/api/users', (req, res) => {
    console.log(req.body);
    const { name, bio } = req.body;
    if (!name || !bio) {
        res.status(400).json({ errorMessage: "Please provide name and bio for the user." });
    }
    db.insert({ name, bio })
        .then(({ id }) => {
            db.findById(id)
                .then(users => {
                    res.status(201).json(users);
                })
                .catch(err => {
                    console.log(err);
                    res.status(500).json({ error: "There was an error while saving the user to the database" });
                });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ error: "server error inserting user" });
        });
});
// // Delete

server.delete('/api/users/:id', (req, res) => {
    const id = req.params.id;
    db.remove(id)
        .then(deleted => {
            res.status(200).json(deleted);
            if(deleted){
                res.status(404).end()
            } else {
                res.status(404).json({errorMessage:"The user with the specified ID does not exist"})
            }
        })
        .catch(error => {
            console.log(error);
            // handle the error
            res.status(500).json({
                errorMessage: "The user could not be removed",
            });
        });
        
});
// // Update Data:

server.put('/api/users/:id', (req, res) => {
    const id = req.params.id;
    const { name, bio } = req.body;
    if (!name || !bio) {
        res.status(400).json({ errorMessage: "Please provide name and bio for the user." });
    }
    db.update(id, {name, bio})
        .then(updated => {
            if (updated) {
                db.findById(id)
                    .then(user => res.status(200).json(user))
                    .catch(err => {
                        console.log(err);
                        res.status(500).json({ error: "The user information could not be modified." });
                    });
            } else {
                res.status(404).json({ message: "The user with the specified ID does not exist." });
            }
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ error: 'Error updating user' });
        });

});


const port = 8000;
server.listen(port, () => console.log(`\n ** api on port: ${port}** \n`));
//type:"mpm i express (no quotes to install the express library"
// to run the server type: npm run server
// to solve the sqllite3 error install this npm i sqlite3