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

// // DELETE
// server.delete('/users/:id', (req, res) => {
//   const { id } = req.params;

//   db.remove(id)
//     .then(deletedUser => {
//       if (deletedUser) {
//         res.status(204).end();
//       } else {
//         res.status(404).json({ message: `I could not find id=${id}` });
//       }
//     })
//     .catch(err => {
//       res.status(500).json({ success: false, err });
//     });
// });

// // PUT
// server.put('/users/:id', (req, res) => {
//   const id = req.params.id;
//   const userInfo = req.body;

//   db.update(id, userInfo)
//     .then(user => {
//       if (user) {
//         res.status(200).json({ success: true, user });
//       } else {
//         res
//           .status(404)
//           .json({ success: false, message: `id ${id} does not exist` });
//       }
//     })
//     .catch(err => {
//       res.status(500).json({ success: false, err });
//     });
// });
