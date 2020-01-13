// implement your API here
const express = require("express");
const Users = require("./data/db.js");

const server = express();

server.use(express.json()); //middleware: express can read json!

//routes

// POST request for a new user -- tested and working

server.post("/api/users", (req, res) => {
  const { name, bio } = req.body;

  Users.insert(req.body)
    .then(user => {
      if (!name || !bio) {
        res
          .status(400)
          .json({ errorMessage: "Please provide name and bio for the user" });
      } else {
        res.status(201).json(user);
      }
    })
    .catch(error => {
      console.log(error);
      res.status(500).json({
        errorMessage: "There was an error while saving the user to database"
      });
    });
});

// GET request for all users --tested and working

server.get("/api/users", (req, res) => {
  Users.find()
    .then(allUsers => {
      res.status(200).json(allUsers);
    })
    .catch(error => {
      console.log(error);
      res.status(500).json({
        errorMessage: "The users information could not be retrieved."
      });
    });
});

// GET request for specific user --tested and working

server.get("/api/users/:id", (req, res) => {
  const id = req.params.id;

  Users.findById(id)
    .then(user => {
      if (!user.id) {
        res
          .status(404)
          .json({ message: "The user with the specified ID does not exist." });
      } else {
        res.status(200).json(user);
      }
    })
    .catch(error => {
      console.log(error);
      res
        .status(500)
        .json({ errorMessage: "The user information could not be retrieved." });
    });
});

// DELETE request for removing a specific user --tested and working

server.delete("/api/users/:id", (req, res) => {
  const id = req.params.id;

  Users.remove(id)
    .then(deleted => {
      if (deleted) {
        res.status(200).json(deleted);
      } else {
        res
          .status(404)
          .json({ message: "The user with the specified ID does not exist." });
      }
    })
    .catch(error => {
      console.log(error);
      res
        .status(500)
        .json({ errorMessage: "The user information could not be removed." });
    });
});

// PUT request for updating a specific user --tested and working

server.put("/api/users/:id", (req, res) => {
  const id = req.params.id;
  const { name, bio } = req.body;

  Users.update(id, req.body)
    .then(user => {
      if (!name || !bio) {
        res
          .status(400)
          .json({ errorMessage: "Please provide name and bio for the user" });
      } else if (!id) {
        res
          .status(404)
          .json({ message: "The user with the specified ID does not exist." });
      } else {
        res.status(200).json(user);
      }
    })
    .catch(error => {
      console.log(error);
      res
        .status(500)
        .json({ errorMessage: "The user information could not be modified." });
    });
});

const port = 5000;

server.listen(port, () => console.log(`\n ** api on port: ${port} ** \n`));
