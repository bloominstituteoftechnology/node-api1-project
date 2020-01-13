// implement your API here
const express = require("express");
const Users = require("./data/db.js");
const server = express();
server.use(express.json());

//GET to "/"
server.get("/", function(request, response) {
  response.send({ hello: "Hey!" });
});

//see a list of Users
server.get("/api/users", (req, res) => {
  Users.find()
    .then(users => {
      res.status(200).json(users);
    })
    .catch(error => {
      console.log(error);
      //handle the error
      res.status(500).json({
        errorMessage: "The users information could not be retrieved"
      });
    });
});

//See a specific User
server.get("/api/users/:id", (req, res) => {
  const id = req.params.id;
  Users.findById(id)
    .then(users => {
      if (users) {
        res.status(200).json(users);
      } else {
        res.status(404).json({
          errorMessage: "the user with the specified ID does not exist"
        });
      }
    })
    .catch(error => {
      console.log(error);
      //handle the error
      res.status(500).json(error);
    });
});

// Create a new User
server.post("/api/users", (req, res) => {
  const { name, bio } = req.body;
  Users.insert({ name, bio })
    .then(user => {
      if (!name || !bio) {
        res
          .status(400)
          .json({ message: "Please Provide Name and Bio for User" });
      } else {
        res.status(201).json(user);
      }
    })
    .catch(error => {
      console.log(error);
      // handle the error
      res.status(500).json({
        errorMessage: "There was an error while saving to the Database"
      });
    });
});

//delete a user
server.delete("/api/users/:id", (req, res) => {
  const id = req.params.id;
  Users.remove(id)
    .then(result => {
      if (removed) {
        res.status(400).json({ message: "User was Removed" });
      } else {
        res
          .status(201)
          .json({ message: "There user with the specified ID does not exist" });
      }
    })
    .catch(error => {
      console.log(error);
      // handle the error
      res.status(500).json({
        errorMessage: "The user could not be removed"
      });
    });
});

//update a User
server.put("/api/users/:id", (request, response) => {
  const id = request.params.id;
  const { name, bio } = request.body;
  if (!name || !bio) {
    return response
      .status(400)
      .json({ message: "Please provide a name and bio" });
  }
  Users.update(id, { name, bio })
    .then(updated => {
      if (updated) {
        Users.findById(id).then(user => {
          response.status(201).json(user);
        });
      } else {
        response
          .status(404)
          .json({ message: "The user with the specified ID does not exist" });
      }
    })
    .catch(error => {
      console.log(error);
      //handle the error
      response.status(500).json({
        errorMessage: "Sorry, we can't update that User."
      });
    });
});

const port = 8000;
server.listen(port, () => console.log(`\n ** api on port: ${port} ** \n`));
