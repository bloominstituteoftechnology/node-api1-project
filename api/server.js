// BUILD YOUR SERVER HERE
const express = require('express');
const User = require('./users/model.js')
const server = express();
server.use(express.json());

server.get('/', (req, res) => {
    res.send(`
      <h2>API</h>
    `);
  });

  server.post('/api/users', (req, res) => {
    User.insert(req.body)
        .then(newUser => {
            res.status(201).json(newUser)
        })
        .catch(err => {
            res.status(400).json({
                message: "Please provide name and bio for the user",
                error: err.message,
        })
        })
  });

server.get('/api/users', (req, res) => {
    User.find()
        .then(users => {
            res.json(users)
        })
        .catch(err => {
            res.status(500).json({
                message: "The users information could not be retrieved",
                error: err.message,
        })
        })
  });

module.exports = server; // EXPORT YOUR SERVER instead of {}
