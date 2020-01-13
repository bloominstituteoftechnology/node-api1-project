// implement your API here

const express = require("express");

const Db = require("./data/db.js");

const server = express();

server.use(express.json());
// test api
server.get("/", (req, res) => {
  res.send({ API: "server is running" });
});
//Post Request
server.post("/api/users", (req, res) => {
  const { name, bio } = req.body;
  Db.insert(req.body)
    .then(data => {
      if (!name || !bio) {
        res.status(400).json({
          errorMessage: "Please provide name and bio for the user."
        });
      } else {
        res.status(201).json(data);
      }
    })
    .catch(error => {
      console.log(error);
      //handle the error
      res.status(500).json({
        errorMessage: "There was an error while saving the user to the database"
      });
    });
});

//Get Request
server.get("/api/users", (req, res) => {
  Db.find()
    .then(data => {
      res.status(200).json(data);
    })
    .catch(error => {
      console.log(error);
      //handle the error
      res.status(500).json({
        errorMessage: "The users information could not be retrieved."
      });
    });
});
//Get by Id Request
server.get("/api/users/:id", (req, res) => {
  const id = req.params.id;
  Db.findById(id)
    .then(data => {
      if (data) {
        res.status(200).json(data);
      } else {
        res.status(404).json({
          message: "The user with the specified ID does not exist."
        });
      }
    })
    .catch(error => {
      console.log(error);
      //handle the error
      res.status(500).json({
        errorMessage: "The user information could not be retrieved."
      });
    });
});
//Delete Request
server.delete("/api/users/:id", (req, res) => {
  const id = req.params.id;
  Db.remove(id)
    .then(data => {
      if (data) {
        res.status(200).json(data);
      } else {
        res.status(404).json({
          message: "The user with the specified ID does not exist."
        });
      }
    })
    .catch(error => {
      console.log(error);
      //handle the error
      res.status(500).json({
        errorMessage: "The user could not be removed"
      });
    });
});
//Put Request
server.put("/api/users/:id", (req, res) => {
  const id = req.params.id;
  const user = req.body;
  const { name, bio } = user;
  if (!name || !bio) {
    res.status(400).json({
      errorMessage: "Please provide name and bio for the user."
    });
  }
  Db.update(id, user)
    .then(data => {
      if (!data) {
        res.status(404).json({
          message: "The user with the specified ID does not exist."
        });
      } else {
        res.status(200).json({
          message: "The user information was updated successfully"
        });
      }
    })
    .catch(error => {
      console.log(error);
      //handle the error
      res.status(500).json({
        errorMessage: "The user information could not be modified."
      });
    });
});

const port = 5000;
server.listen(port, () =>
  console.log(` \n ** API running on port ${port}**\n`)
);
