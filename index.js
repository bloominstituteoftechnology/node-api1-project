// implement your API here
const express = require('express');
const db = require('./data/db.js');

const server = express();

server.listen(4000, () =>{
    console.log('=== server listening on port 4000 ===');
});

server.get('/', (req, res) => {
    res.send('Hello World');
});


server.get('/users', (req, res) =>{
    db.find()
        .then(users => {
            res.status(200).json(users);
        })
        .catch(err => {
            res.status(500).json({ error: "The users information could not be retrieved." });
        });

    
    console.log('END TRANSFER for /users');
});

server.get('/users/:id', (req, res) =>{
    const id = req.params.id;
    db.findById(id)
        .then(users => {
            if(users){

                console.log('Retrieving user ' + id);
                res.status(200).json({ users });

            }else{
                res.status(404).json({ message: `The user with the specified ID ${id} does not exist.` });
            }
        })
        .catch(err => {
            res.status(500).json({ success: false, err });
        });

    res.status(200).json()
});

server.post('/users', (req, res) => {
    const payLoad = req.body;

    db.insert(payLoad)
        .then((pay) => {
            if(pay != null){
                res.status(201).json({ success: true, pay});
                db.find()
                    .then(users =>{
                        res.status(200).json(users);
                    })
                    .catch(err =>{
                        res.status(500).json({ error: "There was an error while saving the user to the database"});
                    });
            }else{
                res.status(400).json({ errorMessage: "Please provide name and bio for the user." });
            }

        })
        .catch((err) => {
            res.status(500).json({ success: false, err });
        });
});

server.put('/users/:id', (req, res) =>{
    const id = req.params.id;
    const payLoad = req.body;

    db.update(id, payLoad)
        .then(pay => {
            if(pay){
                res.status(201).json({ })
            }
        }).catch();
});
//db.update(id, user)
// server.delete();
