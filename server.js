const express = require('express');

const db = require('./data/db.js');

const server = express();

server.get('/', function(req, res) {
  res.json({ api: 'Running...' });
});

server.get('/api/users', (req, res) => {
  db
    .find()
    .then(users => {
      res.json(users);
    })
    .catch(error => {
      res.status(500).json(error);
    });
});

server.get('/api/users/:id', (req, res) => {
  const { id } = req.params;

  db
    .findById(id)
    .then(users => {
      res.json(users[0]);
    })
    .catch(error => {
      res.status(500).json(error);
    });
});

const port = 5000;
server.listen(port, () => console.log('API Running on port 5000'));
