const express = require('express');
const db = require('./data/db.js');

const server = express();

server.use(express.json());

server.get('/api/users', (req, res) => {
  db.find()
    .then(users => res.status(200).json(users))
    .catch(err => {
      console.log(err);
      res.status(500).json({error: "The users information could not be retrieved."});
    });
});

server.post('/api/users', (req, res) => {
  console.log(req.body);
  const { name, bio } = req.body;
  if (!name || !bio) {
    res.status(400).json({error: "Please provide name and bio for the user."});
  } else {
    db.insert({ name, bio })
      .then(({ id }) => {
        db.findById(id)
          .then(user => {
            res.status(201).json(user);
          })
          .catch(err => {
            console.log(err);
            res.status(500).json({error: "The users information could not be retrieved."});
          });
      })
      .catch(err => {
        console.log(err);
        res.status(500).json({error: "There was an error while saving the user to the database"});
      });
  }
});

server.get('/api/users/:id', (req, res) => {
  const { id } = req.params;
  db.findById(id)
    .then(user => {
      console.log("user", user);
      if (user) {
        res.status(200).json(user);
      } else {
        res.status(404).json({error: "The user with the specified ID does not exist."});
      }
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({error: "The user information could not be retrieved."});
    });
});

server.delete('/api/users/:id', (req, res) => {
  const { id } = req.params;
  db.remove(id)
    .then(deleted => {
      console.log(deleted);
      if (deleted) {
        res.status(204).end();
      } else {
        res.status(404).json({error: "The user with the specified ID does not exist."});
      }
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({error: "The user could not be removed"});
    });
});

server.put('/api/users/:id', (req, res) => {
  const { id } = req.params;
  const { name, bio } = req.body;
  if (!name && !bio) {
    // can use a return to shortcut the funciton instead of an else
    return res.status(400).json({error: 'Please provide name and bio for the user.'});
  }
  db.update(id, { name, bio })
    .then(updated => {
      if (updated) {
        db.findById(id)
          .then(user => res.status(200).json(user))
          .catch(err => {
            console.log(err);
            res.status(500).json({error: 'The user informatmion could not be retrieved.'});
          });
      } else {
        res.status(404).json({error: `The user with the specified ID does not exist.`});
      }
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({error: 'The user information could not be modified.'});
    });
});

server.listen(4444, () => console.log("server on 4444"));