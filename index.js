// import express from "Express";

const express = require('express');
const shortid = require('shortid')
const bodyParser = require('body-parser')
const server = express();
server.use(bodyParser.json())

server.listen(8001, () => console.log("API running on port 8001"))

const users = []

server.get('/', (req, res) => {
  res.json({ api: "Up and running!" });
});

server.post('/api/users', function (req, res) {
  const userInfoCreatedInsideRequestBody = req.body;

  if (userInfoCreatedInsideRequestBody.name && userInfoCreatedInsideRequestBody.bio) {
    users.push({
      id: shortid.generate(),
      name: userInfoCreatedInsideRequestBody.name,
      bio: userInfoCreatedInsideRequestBody.bio
    });
    return res.status(201).json(users)

  } else {
    return res.status(400).json({ errorMessage: "Please provide name and bio for the user." })
  }
});

server.get('/api/users', (req, res) => {
  res.status(200).json(users)

});

server.get('/api/users/:id', (req, res) => {
  const id = req.params.id;
  const user = users.find(user => user.id === id)
  if (user) {
    res.status(200).json(user)
  }
  else {
    return res.status(404).json({ errorMessage: "The user with the specified ID does not exist." })
  }
});




server.delete('/api/users/:id', (req, res) => {
  const id = req.params.id;
  const user = users.find(user => user.id === id)
  if (user) {
    users = users.filter(currentUser => currentUser.id !== id)
    res.status(200).json(users);
  } else {
    res.status(404).json({ message: "The user with the specified ID does not exist." })
  }

});


server.patch('/api/users/:id', (req, res) => {
  res.json({ api: "Up and running!" });
});

server.listen(8001, () => console.log("API running on port 8001"))
