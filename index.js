const express = require('express');

const db = require('./data/db.js');


const server = express();

server.listen(4000, () => {
  console.log('server listening on port 4000');
});

server.use(express.json());


server.get('/', (req, res) => {
  res.send('The server is running properly...');
});



//CRUD -------------------

// GET
server.get('/users', (req, res) => {
  db.find()
    .then(users => {
      res.status(200).json(users);
    })
    .catch(err => {
      res.status(500).json({ success: false, err });
    });
});

// POST
server.post('/users', (req, res) => {
  const userInfo = req.body;

db.add(userInfo)
   .then((user) => {
      res.status(201).json({ success: true, user})
   })
   .catch((err) => {
      res.status(500).json({ success: false, err})
   });
});


// DELETE
server.delete('/users/:id', (req, res) => {
  const { id } = req.params;

  db.remove(id)
    .then(deletedUser => {
      if (deletedUser) {
        res.status(204).end();
      } else {
        res.status(404).json({ message: `I could not find id=${id}`});
      }
    })
    .catch(err => {
      res.status(500).json({ success: false, err });
    });
});

// PUT
server.put('/users/:id', (req, res) => {
  const id = req.params.id;
  const userInfo = req.body;

  db.update(id, userInfo)
    .then(user => {
      if (user) {
        res.status(200).json({ success: true, user });
      } else {
        res.status(404).json({ success: false, message: `id ${id} does not exist` });
      }
    })
    .catch(err => {
      res.status(500).json({ success: false, err });
    });
});
