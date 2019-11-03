const express = require("express");

const userData = require("./data/db.js");

const server = express();

server.use(express.json());

const port = 5000;
server.listen(port, () => 
console.log(`\n*** API on port ${port} ***\n`))

//CRUD -------------------

// POST
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
server.get('/users', (req, res) => {
  userData.find()
    .then(users => {
      res.status(200).json(users);
    })
    .catch(err => {
      res.status(500).json({ errorMessage: "The users could not be retrieved" });
    });
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
