const express = require('express');

const server = express();

server.use(express.json());

const shortid = require('shortid');

let users = [];

server.get('/', (req, res) => {
  res.json('hi');
});

server.post('/api/users', (req, res) => {
  const userInfo = req.body;

  userInfo.id = shortid.generate();

  users.push(userInfo)

  res.status(201).json(userInfo);
});

server.get('/api/users', (req, res) => {
  res.status(200).json(users);
});

server.get('/api/users', (req, res) => {
  res.status(200).json(users);
});

server.delete('/api/users/:id', (req, res) => {
  const {id} = req.params;
  
  const found = users.find(user => user.id === id);

  if (found) {
    users = users.filter(user => user.id !== id);
    res.status(200).json(found);
  } else {
    res.status(404).json({message: "not found"});
  }
});

server.patch("/api/users/:id",(req, res) => {
  const {id} = req.params;
  const changes = req.body;

  let found = users.find(use => use.id === id);

  if (found) {
      Object.assign(found, changes);
      res.status(200).json(found)
  } else {
      res.status(404).json({message:"user not found"})
  }
})

server.listen(4000, () => console.log('Running on port 4000'));