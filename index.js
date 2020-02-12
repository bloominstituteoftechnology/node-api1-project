// implement your API here
const express = require('express'); // CommonJS Modules << npm i express

const Users = require('./data/db.js');// << new line

const server = express();

// teaches express how to read JSON from the body
server.use(express.json()); // needed for POST and PUT/PATCH

server.get('/', (req, res) => {
    res.json({ checking: 'it\'s working '})
})

// view a list of users
server.get('/api/users', (req, res) => {
    // got and get the users from the database
    Users.find().then(users => {
        res.status(200).json(users);
    }).catch(err => {
        console.log(err);
        res.status(500).json({ errorMessage: `Error on our side`})
    });
})
// get user by ID
server.get('/api/users/:id', (req, res) => {
    const { id } = req.params;

    Users.findById(id).then(users => {
        res.status(200).json(users);
    }).catch(err => {
        console.log(err);
        res.status(500).json({ errorMessage: 'xxxErrorxxx'})
    })
})

// add a user
server.post('/api/users', (req, res) => {
    const usersInfo = req.body;

    Users.insert(usersInfo)
        .then(user => {  
            res.status(201).json(user);
        }).catch(err => {
            console.log(err);
            res.status(500).json({ errorMessage: 'sorry, it broke'})
        })
})


//edit
server.put('/api/users/:id', (req, res) => {
    const usersInfo = req.body;
    const { id } = req.params;
    Users.update(id,usersInfo)
        .then(edit => {  
                res.status(201).json(edit);
    }).catch(err => {
         console.log(err);
          res.status(500).json({ errorMessage: 'sorry, it broke'})
    })
})


// delete
server.delete('/api/users/:id', (req, res) => {
    const { id } = req.params;

    Users.remove(id).then(removed => {
        res.status(200).json(removed);
    }).catch(err => {
        console.log(err);
        res.status(500).json({ errorMessage: 'xxxErrorxxx'})
    })
})

const port = 5000;
server.listen(port, () => console.log(`\n** API on port ${port} \n`));
