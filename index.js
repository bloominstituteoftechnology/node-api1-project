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
      res.status(500).json({error: "The users information could not be retrieved."});
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
        res.status(404).json({message: "The user with the specified ID does not exist."});
      }
    })
    .catch(error => {
      console.log(`Error on GET /users/${id}`);
      res.status(404).json({error: "The user information could not be retrieved."});
    });
});

server.delete('/users/:id', (req, res) => {
  const id = req.params.id;

  db.remove(id)
    .then(removed => {
      if (removed) {
        res.status(200).json({message: 'The user was removed.'})
      } else {
        res.status(400).json({message: "The user with the specified ID does not exist."});
      }
    })
    .catch(error => {
      res.status(500).json({error: "The user could not be removed."});
    });
});

server.listen(port, () => console.log(`\n***Server running on port ${port}***\n`));