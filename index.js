// implement your API here

const express = require('express');
const dataB = require('./data/db.js');
const server = express();

server.use(express.json()); //teaches express how to parse JSON from body //.POST
//^JSON Middleware

// find [x],
// findById [x],
// insert,
// update,
// remove,

server.get('/', (req, res) => {
    res.send('info from body');
});

// //-*-*-*-* GET REQUEST  -*-*-*-*
server.get('/api/users', (req, res) => {
    dataB
        .find()
        .then(users => res.status(200).json(users)) //200 means good
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: 'The user information could not be retrieved.',
            });
        });
});

// -*-*-*-* POST REQUEST  -*-*-*-*
server.post('/api/users', (req, res) => {
    //read info sent by client
    const userInfo = req.body;

    const { name, bio } = req.body;
    if (name && bio) {
        dataB
            .insert(userInfo)
            .then(Objresult => {
                res.json(Objresult);
                res.status(201);
            })
            .catch(err => {
                res.render(error);
                res.render.status(500);
            });
        // res.add('Sending info from body', userInfo);
    } else {
        res.status(400).json({
            errorMessage: 'Please provide name and bio for the user.',
        });
    }
}); // (/api/users) is a resource

// //-*-*-*-* GET REQUEST  -*-*-*-*
server.get('/api/users/:id', (req, res) => {
    const { hubsID } = req.params.id;

    dataB
        .findById(hubsID)
        .then(user => {
            console.log('user', user);
            if (user) {
                res.status(200).json(user);
            } else {
                res.status(404).json({
                    error: 'The user with the specified ID does not exist.',
                });
            }
            // else {
            //     res.status(400).json({
            //         errorMessage: 'Please provide name and bio for the user.',
            //     });
            // }
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: 'The user information could not be retrieved.',
            });
        });
});

// //-*-*-*-* DELETE REQUEST  -*-*-*-*
server.delete('/api/users/:id', (req, res) => {
    const { id } = req.params;

    dataB
        .remove(id)
        .then(deleted => {
            console.log('deleted', deleted);
            if (deleted) {
                res.status(204).json(deleted);
            } //200 means good
            else {
                res.status(404).json({
                    message: 'The user with the specified ID does not exist.',
                });
            }
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: 'The user could not be removed',
            });
        });
});

//-*-*-*-* UPDATE REQUEST  -*-*-*-*
server.put('/api/users/:id', (req, res) => {
    const { name, bio } = req.body;
    const { id } = req.params;
    if (!name && !bio) {
        res.status(400).json({
            errorMessage: 'Please provide name and bio for the user.',
        });
    }

    dataB
        .update(id, { name, bio })
        .then(updated => {
            if (updated) {
                dataB
                    .findById(id)
                    .then(user => res.status(200).json(user)) //200 means good
                    .catch(err => {
                        console.log(err);
                        res.status(500).json({
                            error:
                                'The user information could not be modified.',
                        });
                    });
            } else {
                res.status(404).json({
                    message: 'The user with the specified ID does not exist.',
                });
            }
        })

        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: 'The user information could not be modified.',
            });
        });
});

const port = 5000;
server.listen(port, () => console.log('api running'));
