// implement your API here
// Import express
const express = require('express');

// Importing methods
const Users = require('./data/db');

// Building server
const server = express();

// Telling server to use jason
server.use(express.json());

// ----ENDPOINTS----

// GET /
server.get('/', (req, res) => {
    res.json({ hello: 'App'})
})

// POST /api/users
server.post('/api/users', (req, res) => {
    const userData = req.body;
    if (userData.name && userData.bio) {
        Users.insert(userData)
      .then(user => {
        res.status(201).json(user);
      })
      .catch(err => {
      res.status(500).json({
        errorMessage: "There was an error while saving the user to the database"
      });
    });
  } else {
    res
      .status(400)
      .json({ errorMessage: "Please provide name and bio for the user." });
    }
  });

// GET /api/users
server.get('/api/users', (req, res) => {
    // got and get the Users from the database
    Users.find().then(hubs => {
        res.status(200).json(hubs);
    }).catch(err => {
        console.log(err);
        res.status(500).json({ errorMessage: "The users information could not be retrieved."})
    });
})

// // /api/users/:id GET
// server.get('/api/users/', (req, res) => {

//     const { id } = req.params;
//     Users.find(id).then(hubs => {
//         res.status(200).json(hubs);
//     }).catch(err => {
//         console.log(err);
//         res.status(500).json({ errorMessage: 'oops'})
//     });
// })


const port = 5000;
server.listen(port, () => console.log(`\n** API on port ${port} \n`));
