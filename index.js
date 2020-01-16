// implement your API here
const express = require('express');
const server = express();

const db = require('./data/db');

// start 
server.listen(3000, () => {
    console.log('The server works on port 3000!!');
})

// server.get('/', (request, response) => {
//     response.send('hello world...');
// })
server.use(express.json());

// GET
server.get('/api/users', (req, res) => {
    db.find()
    .then(users => {
        res.status(200).json(users);
    })
    .catch(err => {
        res.status(500).json({ errorMessage: "The users information could not be retrieved.", err });
    });
})

server.get('/api/users/:id', (req, res) => {
    db.findById(req.params.id)
    .then(usersid => {
        if (usersid) {
            res.status(200).json({ success: true, usersid });
        } else {
            res.status(404).json({ message: "The user with the specified ID does not exist."});
        }
    })
    .catch(err => {
        res.status(500).json({ errorMessage: "The user information could not be retrieved."}, err);
    })
})


// POST
server.post('/api/users', (req, res) => {
    const userInfo = req.body;

    if (!userInfo.name || !userInfo.bio) {
        res.status(400).json({ errorMessage: "Please provide name and bio for the user.", err })
    } else {  // db.add is not a function throwing postman err  ??
        db.insert(userInfo)
        .then(users =>{
            res.status(201).json(users)
        })
        .catch(err=>{
            console.log(err)
            res.status(500).json({errorMessage: "Please provide name and bio for the user.", err})
        })
    }
})
// DELETE
server.delete('/api/users/:id', (req, res) => {
    db.remove(req.params.id)
    .then(deleteduser => {
        if (deleteduser) {
            res.status(204).end();
        } else {
            res.status(404).json({ message: "The user with the specified ID does not exist." });
        }
    })
    .catch(err => {
        res.status(500).json({ errorMessage: "The user could not be removed" }, err);
    })

})
// PUT
server.put('/api/users/:id', (req, res) => {
    const id = req.params.id;
    const usersBio = req.body;

    db.update(id, usersBio)
    .then((users) => {
        if (users === usersBio) {
            res.status(200).json({ success: true, users });
        } else {
            res.status(400).json({  errorMessage: "Please provide name and bio for the user."});
        }
        if (users === id) {
            res.status(200).json({ success: true, users });
        } else {
            res.status(404).json({  message: "The user with the specified ID does not exist." });
        }
    })
    .catch(err => {
        res.status(500).json({ errorMessage: "The user information could not be modified." }, err);
    })
})