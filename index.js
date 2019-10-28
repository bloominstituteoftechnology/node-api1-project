// implement your API here
const express = require('express');

const db = require('./data/db');

const server = express();

server.use(express.json());

server.get('/', (req, res) => {
    res.send('Hello');
})

server.get('/api/users', (req, res) => {
    db.find()
        .then(users => {
            res.status(200).json(users);
        })
        .catch(err => {
            console.log('error', err);
            res.status(500).json({ error: "The users information could not be retrieved." });
        })
})

server.post('/api/users', (req, res) => {
    const newUser = req.body;

    console.log('user info received:', newUser);

    if(!newUser.name || !newUser.bio) {
        res.status(400).json({ errorMessage: "Please provide name and bio for the user." })
    } else {
        db.insert(newUser)
        .then(id => {
            res.status(201).json(id);
        })
        .catch(err => {
            console.log('eror', err);
            res.status(500).json({ error: "There was an error while saving the user to the database" });
        });
    }
});

server.get('/api/users/:id', (req, res) => {
    const id = req.params.id;

    db.findById(id)
        .then(user => {
            if(!user) {
                res.status(404).json({ message: "The user with the specified ID does not exist." });
            } else {
                res.status(200).json(user);
            }            
        })
        .catch(err => {
            console.log('error', err);
            res.status(500).json({ error: "The user information could not be retrieved."});
        });
});

server.delete('/api/users/:id', (req, res) => {
    const userID = req.params.id;

    db.remove(userID)
        .then(message => {
            if(message === 1){
                res.status(200).json({ message: "Successfully deleted user", id: userID });
            } else {
                res.status(404).json({ error: "The user with the specified ID does not exist."});
            }            
        })
        .catch(err => {
            console.log('error', err);
            res.status(500).json({ error: "The user could not be removed."});
        });
});

server.put('/api/users/:id', (req, res) => {
    const userInfo = req.body;
    const userID = req.params.id;


    console.log('updated user info received:', userInfo);

    if(!userInfo.name || !userInfo.bio) {
        res.status(400).json({ errorMessage: "Please provide name and bio for the user." })
    } else {
        db.update(userID, userInfo)
        .then(userUpdated => {
            if(userUpdated !== 1) {
                res.status(404).json({ message: "The user with the specified ID does not exist." });
            } else {
                db.findById(userID)
                    .then(user => {
                        res.status(200).json(user);
                    })
                    .catch(err => {
                        console.log('eror', err);
                        res.status(500).json({ error: "The user information could not be modified." });
                    });            
            }
        })
        .catch(err => {
            console.log('eror', err);
            res.status(500).json({ error: "The user information could not be modified." });
        });
    }
});

const port = 8000;
server.listen(port, () => console.log('\n=== Listening on port 8000 ===\n'));

