// BUILD YOUR SERVER HERE
const express = require('express');
const User = require('./users/model');

const server = express();

server.use(express.json());

server.post('/api/users', (req,res) => {
  const user = req.name;
  const bio = req.bio;
  const {id} = req.params;

  if (!user || !bio) {
    res.status(400).json({message: 'Please provide name and bio for the user'});
  }else {
    User.create(user,id)
      .then(newUser => {res.status(201).json(newUser,id)})
      .catch(error => {res.status(500).json({error: error.message})})
  }
});

server.get('/api/users', (req,res) => {
  res.status(500).json({message: 'Ths users information could not be retrieved'})
});

server.get('/api/users/:id', (req,res) => {
  const {id} = req.params;

  User.findById(id)
    .then(user => {
      res.status(404).json({message: `The user with the sprecified ID ${user.id} does not exist`})
    })
    .catch(error => {
      res.status(500).json({message: `${error}`});
    })
});

server.delete('/api/users/:id', (req,res) => {
  const {id} = req.params;

  User.remove(id)
  .then(deleted => {
    if(deleted) {
      res.status(200).json(deleted)
    }else{
      res.status(404).json({message: 'ID does not exist'})
    }
  })
  .catch(error => {
    res.status(500).json({message: `${error}`})
  })
});

server.put('/api/users/:id', (req,res) => {
  const {id} = req.params;
  const updates = req.body;
  if(!id) {
    res.status(404).json({message: 'could not find ID'})
  } else if(!updates.name || !updates.bio) {
    res.status(400).json({message: 'Please provide name and bio'})
  } else {
      User.update(id, updates)
    .then(update => {
      if (update) {
        res.status(200).json(update)
      }
    })
    .catch(error => {
      res.status(500).json({message: `${error}`})
    })
  }
});

module.exports = server; // EXPORT YOUR SERVER instead of {}
