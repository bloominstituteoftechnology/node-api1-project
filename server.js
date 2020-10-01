//Just practice setting it up

const express = require('express');

const server = express();

server.get('/', (req, res) => {
    res.send('Hello World')
});

server.listen(8000, () =>
console.log('API running on port 8000' ));


//Starting it

server.post('/users', (req, res) => {
    const newUser = database.createUser({
        name: req.body.name,
        bio: req.body.bio
    })

    if(!req.body.name  || !req.body.bio) {
        res.status(400).json({
            errorMessage: "Please provide name and bio for the user."
        })
    }

    if(newUser) {
        res.status(201).json(newUser)
    }
    else{
        res.status(500).json({
            errorMessage: 'There was an error while the user to the database'
        })
    }
})