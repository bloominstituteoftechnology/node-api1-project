// implement your API here

const express = require('express');

const db = require('./data/db');

const server = express();

server.use(express.json());

server.get('/', (req, res) => {
    res.send('Hello Captain');
});

server.get('/users', (req, res) => {
    db.find()
    .then(user => {
        res.status(200).json(user);
    })
    .catch(err => {
        console.log('error', err);
        res.status(500).json({ error: 'failed to get users from db'});
    });
});

server.get('/users/:id', (req, res) => {
    const id = req.params.id;

    db.findById(id)
        .then(user => {
            res.status(200).json(user)
        })
        .catch(err => {
            console.log('error', err);
            res.status(500).json({ error: ' failed to find user from db'})
        });
});

 server.delete('/users/:id', (req, res) => {
    const id = req.params.id;

    db.remove(id)
        .then(count => {
            res.status(200).json({ message: `user with id ${id} deleted`})
        })
        .catch(err => {
            console.log('error', err);
            res.status(500).json({ error: 'failed to delete user from db'})
        });
 });

 server.post('/users', (req, res) => {
    const userInformation = req.body;
    console.log('user info', userInformation);

    db.insert(userInformation)
        .then(user => {
            res.status(201).json(user);
        })
        .catch(err => {
            console.log('error', err)
            res.status(500).json({ error: "failed to add user to the database"})
        });
});

server.put('/users/:id', (req, res) => {
    const id = req.params.id;
    const userInformation = req.body;
    console.log('user info', userInformation);
    console.log(id, userInformation)
    
    db.update(id, userInformation)
    .then(count => {
                if (count === 1 ){
                    db.findById(id)
                    .then(user => {
                        res.status(200).json(user)
                    })
                    .catch(err => {
                        console.log('error', err);
                        res.status(500).json({ error: ' failed to find user from db'})
                    });
                }
                
            })
            .catch(err => {
                console.log('error', err);
                res.status(500).json({ error: ' failed to find user from db'})
            });
});

 const port = 8000;
 server.listen(port, ()=> console.log('api on port 8000'));
