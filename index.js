// implement your API here

const express = require('express');
const db = require('./data/db');
const server = express();
const port = 4000;

server.use(express.json());

server.get('/', (req, res) => {
  res.send({message: 'API is running...'});
});

server.get(`/users`, (req, res) => {
  db.find()
    .then(users => {
      res.status(200).json(users);
    })
    .catch(error => {
      console.log('Error on GET /users', error);
      res.status(500).json({errorMessage: 'Error obtaining list of users'});
    });
});

server.get('/users/:id', (req, res) => {
  const id = req.params.id;

  db.findById(id)
    .then(user => {
      // If the user is found, returns the user, else, returns a default message
      if (user) {
        res.status(200).json(user);
      } else {
        res.status(404).json({message: `Unable to find user with id of ${id}`});
      }
    })
    .catch(error => {
      console.log(`Error on GET /users/${id}`);
      res.status(404).json({errorMessage: `Error obtaining id ${id}`});
    });
});

server.listen(port, () => console.log(`\n***Server running on port ${port}***\n`));