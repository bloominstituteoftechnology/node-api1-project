// implement your API here

const express = require('express');
const dataB = require('./data/db.js');
const server = express();

server.use(express.json()); //teaches express how to parse JSON from body

// find,
// findById,
// insert,
// update,
// remove,

server.get('/', (req, res) => {
    res.send('info from body');
});
// -*-*-*-* POST REQUEST  -*-*-*-*
server.post('/api/users', (req, res) => {
    //read info sent by client
    const userInfo = req.body;
    // res.send('info from body', userInfo);

    if (userInfo.name && userInfo.bio) {
        dataB
            .insert(userInfo)
            .then(result => {
                res.json(result);
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
    //check
    //     if(userInfo.name && userInfo.bio {
    //     dataB
    // .insert(userInfo)
    //         .then(result => {
    //             res.json(result);
    //         })
    //         .catch(err => {
    //             res.send(err);
    //         });
    //     // res.send('post to api.users is working');
    // } else {
}); // (/hubs) is a resource

//-*-*-*-* GET REQUEST  -*-*-*-*
server.get('/api/users', (req, res) => {
    const userInfo = req.body;
    dataB
        .find() //promise
        .then(users => {
            res.status(200).json(users); //200 means good
        })
        .catch(err => {
            res.status(500).json({
                error: 'The users information could not be retrieved.',
            });
        });

    // res.send('info from body');
    //(rez, res) ->route handler
    // dataB
    //     .find() //return a promise.
    //     .then(dataB => {
    //         // .json will convert the data passed to JSON
    //         // also tells the client we're sending JSON through and HTTP header
    //         res.status(200).json(dataB);
    //     })
    //     .catch(err => {
    //         res.status(500).json({ message: 'error getting the list of hubs' });
    //     });
});

// //-*-*-*-* GET REQUEST  -*-*-*-*
server.get('/api/users', (req, res) => {
    dataB.find().then(users => res.status(200).json(users));
});

// //-*-*-*-* GET REQUEST  -*-*-*-*
server.get('/api/users/:id', (req, res) => {
    const hubsID = req.params.id;

    dataB.findById(hubsID).then(user => {
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
    });
});

const port = 5000;
server.listen(port, () => console.log('api running'));
