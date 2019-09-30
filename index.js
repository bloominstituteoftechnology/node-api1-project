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

  server.post('/api/users',(req,res)=>{
      const {name, bio} = req.body;

      if (!name || !bio) {
          res.status(400)
          .json({errorMsg: 'Please provide name and bio for the user in your msg body'});
        } else {
            Users.insert(req.body)
              .then(user => {
                res.status(201).json(user);
              })
              .catch(() => {
                res.status(500).json({
                  errorMessage:
                    'There was an error while saving the user!!! Please try again!!!',
                });
              });
          }
        });
        server.delete('/api/users/:id', (req, res) => {
          Users.remove(req.params.id)
            .then(count => {
              if (count && count > 0) {
                res.status(200).json({
                  message: 'the user was deleted.',
                });
              } else {
                res
                  .status(404)
                  .json({ message: 'The user ID does not exist .' });
              }
            })
            .catch(() => {
              res.status(500).json({ errorMessage: 'The user could not be removed' });
            });
        });
        

const port = 3333;
server.listen(port, () => console.log(`\n *** Api listening on port ${port} ***\n`))