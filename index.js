const express = require('express');
const db = require('./data/db');

const server = express();

server.use(express.json());

const port=5000

server.listen(port, () => {
    console.log((`running on port ${port}`))
});

server.get('/api/users', (req, res) => {
    db.find()
        .then(users => {
            res.status(200).json(users);
        })
        .catch(err => {
            res.status(500).json({
                error: "There was an error while saving the user to the database" 
            })
        })
});

server.post('/api/users', (req, res) => {
    const userData = req.body
    const { name, bio } = userData
    if (!name || !bio) {
        res
            .status(400)
            .json({ errorMessage: 'Request is empty - need name and bio.' })
    } else if (name && bio) {
        db.insert(req.body)
            .then(user => {
        db.findById(user.id)
            .then(foundUser => {
                res.status(200).json(foundUser);
          })
          .catch(() => {
            json
              .status(500)
              .json({ message: 'There was an error retrieving the user' });
          });
      })
      .catch(() => {
        res.status(500).json({
          error: 'There was an error while saving the user to the database'
        });
      });
  }
});

server.get('/api/users/:id', (req, res) => {
    const { id } = req.params;
    
    db.findById(id)
        .then(user => {
            if(user) {
                res.status(200).json(user);
            } else {
                res.status(404).json({ message: "The user with the specified ID does not exist." });
            };
        })
        .catch(err => {
            res
                .status(500)
                .json({ error: "The user information could not be retrieved."});
        });
});

server.get('/api/users/:id', (req, res) => {
    const { id } = req.params

    db.findById(id)
        .then(user => {
        if (!user) {
            res.status(404).json({
                message: 'The user with the specified ID does not exist.'
            })
        } else {
                res.status(200).json(user)
            }
        })
        .catch(() => {
            res
                .status(500)
                .json({ error: 'The user information could not be retrieved.' })
        })
  })

  server.delete('/api/users/:id', (req, res) => {
    const { id } = req.params
    db.remove(id)
        .then(userToDelete => {
        if (userToDelete) {
            res.status(204).end();
        } else {
            res
            .status(500)
            .json({ message: 'The user with the specified ID does not exist.' });
        }
        })
        .catch(() => {
        res.status(500).json({ error: 'The user could not be removed' });
        });
});

server.put('/api/users/:id', (req, res) => {    
    const { id } = req.params;    
    const user = req.body;
    const { name, bio } = user;
    if (!name || !bio) {
        res
          .status(400)
          .json({ errorMessage: 'Please provide name and bio for the user.' });
      }
      db.update(id, user)
      .then(updatedUser => {        
        if (!updatedUser) {
          res
            .status(404)
            .json({ message: 'The user with the specified ID does not exist.' });
        } else {
          res
            .status(200)
            .json({ message: 'The user information was updated successfully' });
        }
      })
      .catch(() => {
        res
          .status(500)
          .json({ error: 'The user information could not be modified.' });
      });
  }); 