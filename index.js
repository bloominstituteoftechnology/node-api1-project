const express = require('express');

const db = require('./database');

const server = express();
// const port = 8080;

server.use(express.json());

// server.unsubscribe(database)
//Test to see if server is running
server.get('/', (req, res) => {
  res.json({ message: 'API, Welcomes You' });
});

// create endpoint that creates a new user
server.post('/api/users/', (req, res) => {
  const newUser = db.createUser({
    name: req.body.name,
  });
  res.status(201).json(newUser);
  newUser
    .findUserPosts(req.params.id)
    .then((posts) => {
      res.json(posts);
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json({
        errorMessage:
          'There was an error while saving the user to the database',
      });
    });
});

// To see if endpoint listens
server.get('/api/users', (req, res) => {
  // getting a list of my users from my created Database
  const users = db.getUsers();
  res.json(users);
});

// specifiy user by their ID
server.get('/api/users/:id', (req, res) => {
  const id = req.params.id;
  const user = db.getUserById(id);
  if (user) {
    res.json(user);
  } else {
    res.status(404).json({
      message: 'The user with the specified ID does not exist.',
    });
  }
});

// Delete come back
server.delete('/api/users/:id', (req, res) => {
  const user = db.getUserById(req.params.id);
  //   console.log(id);
  if (user) {
    db.deleteUser(req.params.id);

    res.status(204).end();
  } else {
    res.status(404).json({
      errorMessage: 'The user could not be removed',
    });
  }
});

server.put('/api/users/:id', (req, res) => {
  try {
    const user = db.getUserById(req.params.id);
    if (!user) {
      return res.status(404).json({
        message: 'The user with the specified ID does not exist',
      });
    }
    // res.json(user);

    if (!req.body.name || !req.body.bio) {
      return res.status(400).json({
        errorMessage: 'Please provide name and bio for the user.',
      });
    }

    const uuser = db.updateUser(req.params.id, req.body);
    res.json(uuser);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      errorMessage: 'The user information could not be modified.',
    });
  }
});

server.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
