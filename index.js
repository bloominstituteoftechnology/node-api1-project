// implement your API here
const express = require("express");
const Db = require("./data/db.js");
const server = express();
const port = 5000;

server.use(express.json());

server.listen(port, () => {
  console.log(`\n Server is listening on port ${port}...\n`);
});

server.get("/", (req, res) => {
  res.json({
    response: "Hello. Please reference the endpoints from the README.md file"
  });
});

server.get("/api/users", (req, res) => {
  Db.find()
    .then(users => {
      res.status(201).json(users);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        errorMessage: "The users information could not be retrieved."
      });
    });
});

server.post("/api/users", (req, res) => {
  const name = req.body.name;
  const bio = req.body.bio;
  if (!name || !bio) {
    res.status(400).json({
      errorMessage: "Please provide name and bio for the user."
    });
  } else {
    Db.insert(req.body)
      .then(user => {
        res.status(201).json(req.body);
      })
      .catch(err => {
        console.log(err);
        res.status(500).json({
          errorMessage:
            "There was an error while saving the user to the database"
        });
      });
  }
});

server.get("/api/users/:id", (req, res) => {
  const id = req.params.id;
  Db.findById(id)
    .then(user => {
      if (!user) {
        res.status(404).json({
          errorMessage: "The user with the specified ID does not exist."
        });
      } else {
        res.status(200).json(user);
      }
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        errorMessage: "The user information could not be retrieved."
      });
    });
});

server.delete("/api/users/:id", (req, res) => {
  const id = req.params.id;
  Db.findById(id)
    .then(user => {
      if (!user) {
        res.status(404).json({
          errorMessage: "The user with the specified ID does not exist."
        });
      } else {
        res.status(200).json(user);
      }
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        errorMessage: "The user could not be removed"
      });
    });
});

server.put("/api/users/:id", (req, res) => {
  const id = req.params.id;
  const name = req.body.name;
  const bio = req.body.bio;
  Db.update(id, req.body)
    .then(user => {
      if (!user) {
        res.status(404).json({
          errorMessage: "The user with the specified ID does not exist."
        });
      } else if (!name || !bio) {
        res.status(500).json({
          errorMessage: "The user information could not be modified."
        });
      } else {
        res.status(200).json(req.body);
      }
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        errorMessage: "The user information could not be modified."
      });
    });
});