const express = require('express');
const shortid = require('shortid');
const port='5000';

const server = express();

server.use(express.json());



let users = [
    {
        id: shortid.generate(), 
        name: "Jane Doe", 
        bio: "Not Tarzan's Wife, another Jane" 
    },
    {
        id: shortid.generate(),
        name: "Priyanka Sarkar", 
        bio: "Student" 
    },
    {
        id: shortid.generate(), 
        name: "Soumen Sinha", 
        bio: "Software Engineer" 
    },
    {
        id: 2, 
        name: "Hridaan Sinha", 
        bio: "Student" 
    },
]

// POST
server.post('/api/users', (req, res) => {
    const userInfo = {
        id: shortid.generate(),
        name: req.body.name,
        bio: req.body.bio
    };
    if (res) {
        if (userInfo.name && userInfo.bio) {
            if (typeof userInfo.name !== 'string' || typeof userInfo.bio !== 'string') {
                res.status(400).json({
                    errorMessage: "Please provide name and bio for the user."
                })
            } else {
                users.push(userInfo)
                res.status(201).json(userInfo)
            }
        } 
    } else {
        res.status(500).json({
            errorMessage: "There was an error while saving the user to the database"
        })
    }
})

//GET
server.get('/api/users', (req, res) => {
    if (res) {
        res.status(200).json(users);
    } else {
        res.status(500).json({
            errorMessage: "The user information could not be retrieved."
        })
    }
})

server.get('/api/users/:id', (req, res) => {
    const id = req.params.id;
    const user = users.filter(user => user.id == id);
    if (res) {
        if (user.length != 0) {
            res.status(200).json(user);
        } else {
            res.status(404).json({
                message: "The user with the specified ID does not exist."
            })
        }
    } else {
        res.status(500).json({
            errorMessage: "The user information could not be retrieved."
        })
    }
})

//DELETE
server.delete('/api/users/:id', (req, res) => {
    const id = req.params.id;
    const delUser = users.filter(user => user.id == id);

    if (res) {
        if (delUser.length != 0) {
            users = users.filter(user => user.id != id);

            res.status(200).json(delUser);
        } else {
            res.status(404).json({
                message: "The user with the specified ID does not exist."
            })
        }
    } else {
        res.status(500).json({
            errorMessage: "The user could not be removed"
        })
    }
})

//PUT
server.put('/api/users/:id', (req, res) => {
    const id = req.params.id;
    const user = users.find(user => user.id == id);
    const index = users.indexOf(user);
    console.log(user)

    if (res) {
        if (!user) {
            res.status(404).json({
                message: "The user with the specified ID does not exist."
            })
        } else {
            const updatedUser = { ...user, ...req.body };
            users[index] = updatedUser;

            res.status(200).json(updatedUser);
        }
    } else {
        res.status(500).json({
            errorMessage: "The user information could not be modified."
        })
    }
})

server.listen(port, () => console.log('\n== API is up ==\n'));