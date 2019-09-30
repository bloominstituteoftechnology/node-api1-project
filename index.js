// implement your API here
const express = require('express');

const Users = require('./data/db')

const server = express();

server.use(express.json());

server.get('/api/users', (req, res) => {
    Users.find()
      .then(users => {
        res.status(200).json(users);
      })
      .catch(() => {
        res.status(500).json({
          errorMessage: 'The users information could not be found.',
        });
      });
  });
  
  server.get('/api/users/:id', (req, res) => {
    Users.findById(req.params.id)
      .then(user => {
        if (user) {
          res.status(200).json(user);
        } else {
          res
            .status(404)
            .json({ message: 'The user with the specified ID does not exist.' });
        }
      })
      .catch(() => {
        res
          .status(500)
          .json({ errorMessage: 'The user information could not be found.' });
      });
  });
  

const port = 3333;
server.listen(port, () => console.log(`\n *** Api listening on port ${port} ***\n`))