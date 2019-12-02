// implement your API here

const express = require('express');
const db = require('./data/db');
const server = express();
const port = 4000;

server.use(express.json());

// ***** GET REQUESTS *****

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

// ***** POST REQUESTS *****

server.post(`/users`, (req, res) => {
  const {name, bio} = req.body;

  // First need to check if both the bio and the name exist
  if (!name || !bio) {
    res.status(400).json({errorMessage: "Please provide name and bio for the user."});
  } else {

    // If the checks pass, then we can insert the newly created user into the DB
    db.insert(req.body)
      .then(user => {
        res.status(201).json(user)
      })
      .catch(error => {
        res.status(500).json({error: "There was an error while saving the user to the database."});
      })
  }
});

// ***** DELETE REQUESTS *****

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

// ***** PUT REQUESTS *****

server.put('/users/:id', (req, res) => {
  const {name, bio} = req.body;

  // Check if name and bio are empty, and returns errorMessage if they are
  if (!name || !bio) {
    res.status(400).json({errorMessage: "Please provide name and bio for the user."})
  } else {
    // Starts the update process, requests an ID and bio and name from the client
      db.update(req.params.id, req.body)
        .then(user => {
          // if the user is found with the ID, updates, else, returns a message saying the user is not found
          if (user) {
            res.status(200).json(req.body);
          } else {
            res.status(404).json({message: 'The user with the specific ID does not exist.'});
          }
        })
        .catch(error => {
          res.status(500).json({error: "The user information could not be modified."});
        });
  }

});

server.listen(port, () => console.log(`\n***Server running on port ${port}***\n`));