const express = require('express');

const Users = require('./data/db.js');

const server = express();
const cors = require('cors')

server.use(express.json());
server.use(cors());

// POST 
server.post("/api/users", (req, res) => {

    // const newUser = req.body;

    // if (!newUser.hasOwnProperty('name') || !newUser.hasOwnProperty('bio')) {
    //     

    const { name, bio } = req.body;
    const newUser = { name, bio };

    if (!name || !bio) {
        res.status(400).json({ message: "Please provide name and bio for the user." })
    } else {
        Users.insert(newUser)
            .then(usr => {
                res.status(201).json(usr)
            })
            .catch(() =>
                res.status(500).json({
                    errorMessage: "There was an error while saving the user to the database"
                })
            )
    }
})

// GET ALL USERS

server.get("/api/users", (req, res) => {
    Users.find()
        .then(users => {
            res.status(200).json(users)
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ errorMessage: "The users information could not be retrieved." })
        })
})

// GET A USER 

server.get('/api/users/:id', (req, res) => {
    const id = req.params.id;
    Users.findById(id)
        .then(user => {
            if (!user) {
                res.status(404).json({ message: "The user with the specified ID does not exist." })
            }
            else {
                res.status(200).json(user);
            }
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({ errorMessage: "The user information could not be retrieved." })
        });
});

// DELETE A USER 

server.delete('/api/users/:id', (req, res) => {
    const id = req.params.id;
    Users.remove(id)
        .then(user => {
            if (!user) {
                res.status(404).json({
                    message: "The user with the specified ID does not exist."
                })
            }
            else {
                res.status(200).json({
                    user
                })
            }
        })
        .catch(err => {
            res.status(500).json({
                errorMessage: "The user could not be removed"
            })
        })
})

// UPDATE A USER 

server.put('/api/users/:id', (req, res) => {
    const id = req.params.id;

    const updatedUser = req.body;

    // const foundUser = Users.findById(id).then

    Users.findById(id)
        .then(user => {
            if (!user) {
                res.status(404).json({ message: "The user with the specified ID does not exist." })
            }
            else {
                if ((!updatedUser.hasOwnProperty('name')) || (!updatedUser.hasOwnProperty('bio'))) {
                    res.status(400).json({ errorMessage: "Please provide name and bio for the user." })
                }
                else {
                    Users.update(id, updatedUser)
                        .then(response => {
                            if (response > 0) {
                                Users.findById(id)
                                    .then(user => {
                                        res.status(200).json(user);
                                    })
                            } else {
                                res.status(500).json({ errorMessage: "The user information could not be modified." })
                            }
                        })
                }
            }
        })
        .catch(err => {
            res.status(500).json({ errorMessage: "The user information could not be modified." })
        })
})


const port = 8000;
server.listen(port, () => console.log(`\n *** API on port: ${port}`))