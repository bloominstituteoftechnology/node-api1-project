// import express from "Express";

const express = require('express');
const shortid = require('shortid')
const bodyParser = require('body-parser')
const server = express();
server.use(bodyParser.json())

const users = []

server.get('/', (req, res) => {
  res.json({ api: "Up and running!" });
});

server.post('/api/users', function (req, res) {
  const userInfoCreatedInsideRequestBody = req.body;

  users.push({
    id: shortid.generate(),
    name: userInfoCreatedInsideRequestBody.name,
    bio: userInfoCreatedInsideRequestBody.bio
  });
  res.end();
});

server.get('/api/users', (req, res) => {
  res.json(users);
});

server.get('/api/users/:id', (req, res) => {
  res.json({ api: "Up and running!" });
});

server.delete('/api/users/:id', (req, res) => {
  res.json({ api: "Up and running!" });
});

server.patch('/api/users/:id', (req, res) => {
  res.json({ api: "Up and running!" });
});

server.listen(8001, () => console.log("API running on port 8001"))
