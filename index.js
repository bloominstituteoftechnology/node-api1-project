// implement your API here// install express and cors (npm packages)
// STEP 1: flesh out a dummy server
// STEP 2: flesh out the five endpoints (will use those helpers)
// imports
const express = require("express");
const cors = require("cors");

const { find, findById, insert, update, remove } = require("./data/db");

// instantiate an express app
const app = express();
// plug extra functionality to our app
// we need to be able to read req.body
app.use(express.json());
// we need to enable CORS so this server works for all origins
app.use(cors());

app.get("/users", (req, res) => {
  // Get all users, we do not need any extra information such as id.
  find()
    .then(users => {
      res.status(200).json(users);
    })
    .catch(error => {
      res.status(500).json({
        message: error.message,
        stack: error.stack
      });
    });
});

// To get a user by id
app.get("/users/:id", (req, res) => {
  // get a user by id which is a parameter of the path
  const { id } = req.params;
  console.log(id);

  findById(id)
    .then(data => {
      // Two things can happen: id exists or not
      // id exists: we just res.json the data
      // id does not exist: we just res.json a 404
      if (data) {
        res.status(200).json(data);
      } else {
        res.status(500).json({
          errorMessage: "The users information could not be retrieved."
        });
      }
    })
    .catch(error => {
      // crashes and such
      // res.json the error message and stack
      console.log(error);
    });
});

// To include a new user to the database
app.post("/users", (req, res) => {
  // Post a new user using the request body
  const newUser = req.body;
  insert(newUser)
    .then(user => {
      if (user.name !== "" || user.bio !== "") {
        res.status(201).json(user);
      } else {
        res
          .status(400)
          .json({ errorMessage: "Please provide name and bio for the user." });
      }
    })
    .catch(error => {
      console.log(error);
    });
});
// DELETE A USER by id
app.delete("/users/:id", (req, res) => {
  const { id } = req.params;
  console.log(id);
  remove(id)
    .then(data => {
      if (data) {
        res.status(202).json(`User with id ${data.id} has been deleted`);
      } else {
        res
          .status(404)
          .json({ message: "The user with the specified ID does not exist." });
      }
    })
    .catch(error => {
      console.log(error);
    });
});
// Update a user
app.put(`/users/:id`, (req, res) => {
  const { id } = req.params;
  const replacementUser = req.body;
  update(id, replacementUser)
    .then(data => {
      if (data) {
        res.status(200).json(`User with ${id} has been updated`);
      } else {
        res.status(404).json(`User ${id} could not be updated`);
      }
    })
    .catch(error => {
      console.log(error);
    });
});
// we need code to spin up the server and just have it listen for incoming
app.listen(3000, () => {
  console.log("listening on 3000");
});
