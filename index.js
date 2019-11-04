const express = require("express");

const userData = require("./data/db.js");

const server = express();

server.use(express.json());

const port = 5000;
server.listen(port, () => 
console.log(`\n*** API on port ${port} ***\n`))

//CRUD -------------------

// POST
// Creates a user using the information sent inside the request body.
server.post("/users", (req, res) => {
  const { name, bio } = req.body;

  if (!name || !bio) {
    res
      .status(400)
      .json({ errorMessage: 'Please provide name and bio for the user.' });
  } else {
    userData.insert(req.body)
      .then(user => {
        res.status(201).json(user);
      })
      .catch(() => {
        res.status(500).json({
          errorMessage:
            'There was an error while saving the user to the database',
        });
      });
  }
});

// GET
// Returns an array of all the user objects contained in the database.
server.get('/users', (req, res) => {
  userData.find()
    .then(users => {
      res.status(200).json(users);
    })
    .catch(err => {
      res.status(500).json({ errorMessage: "The users could not be retrieved" });
    });
});

// GET id
// Returns the user object with the specified id.
server.get('/users/:id', (req, res) => {
  userData.findById(req.params.id)
  .then(user => {
    if(user) {
      res.status(200).json(user);
    } else {
      res.status(404).json({ message: "User with this id does not exist."})
    }
  })
  .catch(() => {
    res.status(500)
    .json({ errorMessage: 'User could not be retrieved. '})
  })
});

// DELETE
// Removes the user with the specified id and returns the deleted user.
server.delete('/users/:id', (req, res) => {
  userData.remove(req.params.id)
    .then(deleted  => {
      if (deleted && deleted > 0) {
        res.status(200).json({
          message: 'user was deleted',
        });
      } else {
        res.status(404).json({ message: `User id=${id} does not exist.` });
      }
    })
    .catch(err => {
      res.status(500).json({ message: 'User could not be removed.' });
    });
});

// PUT
// Updates the user with the specified id using data from the request body. Returns the modified document, NOT the original.
server.put('/users/:id', (req, res) => {
  const { name, bio } = req.body;

if (!name || !bio) {
  res.status(400).json({ errorMessage: 'Please provide name and bio for user. '})
} else {
  userData.update(req.params.id, req.body)
  .then(user => {
    if (user) {
      res.status(200).json(user);
    } else {
      res
        .status(404)
        .json({
          message: "User with specified id does not exist.",
        })
    }
  })
  .catch(() => {
    res.status(500).json({
      message: 'User could not be modified',
    })
  })
}
});
