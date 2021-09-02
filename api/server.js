// BUILD YOUR SERVER HERE
const express = require('express');
const User = require('./users/model');

const server = express();

server.use(express.json());

server.post('/api/users', async (req,res) => {
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
server.get();
server.get();
server.delete();
server.put();

module.exports = server; // EXPORT YOUR SERVER instead of {}
