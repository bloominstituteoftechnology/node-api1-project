// implement your API here
// Import express
const express = require('express');

// Importing methods
const Users = require('./data/db');

// Building server
const server = express();

// Telling server to use jason
server.use(express.json());

// +-+-+-+-+ ENDPOINTS +-+-+-+-+ //

// GET=> /
server.get('/', (req, res) => {
    res.json({ hello: 'App'})
})

// POST=> /api/users
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

// GET=> /api/users
server.get('/api/users', (req, res) => {
    
    Users.find().then(user => {
        res.status(200).json(user);
    }).catch(err => {
        console.log(err);
        res.status(500).json({ errorMessage: "The users information could not be retrieved."})
    });
})

// GET=> /api/users:id
server.get('/api/users/:id', (req, res) => {
    const { id } = req.params;

    Users.findById(id)
        .then(user => {
          if (user) {
              res.status(200).json(user);
          } else {
              res.status(404).json({
                  message: "The user with the specified ID does not exist."
              });
          }

      })
      .catch(err => {
          res.status(404).json({
              errorMessage: "The user information could not be retrieved."
          });
})
})

// DELETE=> /api/users:id
server.delete('/api/users/:id', (req, res) => {
  const userId = req.params.id;
  Users.remove(userId)
      .then(user => {
          if (user) {
              res.status(200).json(user);
          } else {
              res.status(404).json({
                message: "The user with the specified ID does not exist."
              });
          }
      })
      .catch(err => {
          res.status(500).json({
            errorMessage: "The user could not be removed"
          });
      })
});

// PUT=> /api/users:id
server.put("/api/users/:id", (req, res) => {
const {id} = req.params;
const {name, bio} = req.body;
Users.update(id, {name, bio})
if (editUser.name && editUser.bio) {
  Users.update(editUser.id, editUser)
    .then(user => {
      if (user) {
        res.status(201).json(user);
      } else {
        res.status(404).json({
          message: "The user with the specified ID does not exist."
        });
      }
    })
    .catch(err => {
      res.status(500).json({
        errorMessage: "The user information could not be modified."
      });
    });
} else {
  res
    .status(400)
    .json({ errorMessage: "Please provide name and bio for the user." });
}
});


const port = 5000;
server.listen(port, () => console.log(`\n** API on port ${port} \n`));
