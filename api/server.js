// BUILD YOUR SERVER HERE
const express = require('express')

const User = require('./users/model')

const server = express()

server.use(express.json())

server.post('/api/users', (req, res) => {
    const newUser = req.body

    if(!newUser.name || !newUser.bio) {
        res.status(400).json({ message: 'Please provide name and bio for the user'})
    } else {
        User.insert(newUser)
        .then(users => {
            res.status(201).json(users)
        })
        .catch(() => {
            res.status(500).json({ message: 'There was an error while saving the user to the database'})
        })
    }
})

server.get('api/users', (req, res) => {
    User.find()
    .then(user => {
        res.status(200).json(user)
    })
    .catch(() => {
        res.status(500).json({ message:'The users information could not be retrieved'})
    })
})

server.get('/api/users/:id', (req, res) => {
    const id  = req.params.id
    User.findById(id)
    .then(users => {
        if (!users) {
            res.status(404).json({ message: 'The user with the specified ID does not exist'})
        } else {
            res.json(users)
        }
    })
    .catch(() => {
        res.status(500).json({ message: 'The user information could not be retrieved'})
    })

})

server.delete("/api/users/:id", async (req, res) => {
    try {
      const deleted = await User.remove(req.params.id);
      if (!deleted) {
        res
          .status(404)
          .json({ message: "The user with the specified ID does not exist" });
      } else {
        res.json(deleted);
      }
    } catch (err) {
      res.status(500).json({ message:'The user could not be removed'});
    }
  });

module.exports = server; // EXPORT YOUR SERVER instead of {}
