
const express = require('express');
const User = require('./users/model');

// create instance of express app
const server = express();

// apply middleware
server.use(express.json());

// | POST   | /api/users     | Creates a user using the information sent inside the `request body`.                                   |
server.post('/api/users', (req, res) => {
  const user = req.body;
  if (!user.name || !user.bio) {
    res.status(422).json('Please provide name and bio for the user');
  }
  User.insert(user)
    .then(user => {
      res.status(201).json(user);
    })
    .catch(err => {
      console.error(err);
      res.status(500).json({ message: "There was an error while saving the user to the database" });
    });
});

// | GET    | /api/users     | Returns an array users.                                                                                |
server.get('/api/users', (req, res) => {
  User.find()
    .then(users => {
      res.status(200).json(users);
    })
    .catch(err => {
      console.error(err);
      res.status(500).json({ message: "The users information could not be retrieved" });
    });
});

// | GET    | /api/users/:id | Returns the user object with the specified `id`.                                                       |
server.get('/api/users/:id', (req, res) => {
  User.findById(req.params.id)
    .then(user => {
      if (user) {
        res.status(200).json(user);
      }
      else {
        res.status(404).json({ message: "The user with the specified ID does not exist" });
      }
    })
    .catch(err => {
      console.error(err);
      res.status(500).json({ message: "The user information could not be retrieved" });
    });
});

// | DELETE | /api/users/:id | Removes the user with the specified `id` and returns the deleted user.                                 |
server.delete('/api/users/:id', (req, res) => {
  User.remove(req.params.id)
    .then(user => {
      if (user) {
        res.status(200).json(user);
      }
      else {
        res.status(404).json({ message: "The user with the specified ID does not exist" });
      }
    })
    .catch(err => {
      console.error(err);
      res.status(500).json({ message: "The user could not be removed" });
    });
});

// | PUT    | /api/users/:id | Updates the user with the specified `id` using data from the `request body`. Returns the modified user |
server.put('/api/users/:id', (req, res) => {
  const user = req.body;
  User.update(req.params.id, user)
    .then(user => {
      if (user) {
        res.status(200).json(user);
      }
      else {
        res.status(404).json({ message: "The user with the specified ID does not exist" });
      }
    })
    .catch(err => {
      console.error(err);
      res.status(500).json({ message: "The user information could not be modified" });
    });
});

module.exports = server;
