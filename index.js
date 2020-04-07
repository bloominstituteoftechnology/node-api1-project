
const express = require('express');

const shortid = require('shortid');

const cors = require("cors");

const server = express();

server.use(cors());

let users = [];
server.use(express.json());

server.get('/', (req, res) => {

    res.json({ api: "running..." });

});

server.get("/api/users", (req, res) => {

  res.status(200).json(users);

});

server.post(`/api/users`, (req, res) => {

    if (!req.body.name || !req.body.bio) {
      res
        .status(400)
        .json({ errorMessage: "Please provide name and bio for the user." });
    } else {
      let user = {
        id: shortid.generate(),
        ...req.body,
      };
  
      if (users.find((el) => el.id === user.id)) {
        res
          .status(500)
          .json({
            errorMessage:
              "There was an error while saving the user to the database",
          });
      } else {
        users.push(user);
        res.status(201).json(users);
      }
    }
  });

server.get("/api/users/:id", (req, res) => {
  const id = req.params.id;

  const user = users.find((u) => u.id == id);

  if (user) {
    res.status(200).json(user);
  } else {
    res.status(404).json({ message: "User not found." });
  }
});

server.delete("/api/users/:id", (req, res) => {

  const deleteUser = users.find((user) => user.id === req.params.id);

  users = users.filter((user) => user.id !== req.params.id);


  res.send(deleteUser);

});


const port = 5000;

server.listen(port, () => console.log(`api on port ${port}`));