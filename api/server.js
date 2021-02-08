// BUILD YOUR SERVER HERE
const Person = require('./users/model');
const express = require("express");
const server = express();
const CORS = require('cors')

server.use(express.json());

server.use(CORS())
server.post("/api/users", async (req, res) => {
  const person = req.body;
  if (!person.name || !person.bio) {
    res
      .status(400)
      .json({ errorMessage: "Please provide name and bio for the user." });
  } else {
    try {
      const newPerson = await Person.create(person);

      res.status(201).json(newPerson);
    } catch (error) {
      res
        .status(500)
        .json({
          errorMessage:
            "There was an error while saving the user to the database",
        });
    }
  }
});

server.get("/api/users", (req, res) => {
  Person.findAll()
    .then((people) => {
      res.status(200).json(people);
    })
    .catch((error) => {
      res
        .status(500)
        .json({
          errorMessage: "The users information could not be retrieved.",
        });
    });
});

server.get("/api/users/:id", (req, res) => {
  const { id } = req.params;

  Person.findById(id)
    .then((person) => {
      if (!person) {
        res
          .status(404)
          .json({ message: "The user with the specified ID does not exist." });
      } else {
        res.status(200).json(person);
      }
    })
    .catch((error) => {
      res
        .status(500)
        .json({ errorMessage: "The user information could not be retrieved." });
    });
});

server.delete("/api/users/:id", (req, res) => {
  const { id } = req.params;
  Person.delete(id)
    .then((deleted) => {
      if (!deleted) {
        res
          .status(404)
          .json({ message: "The user with the specified ID does not exist." });
      } else {
        res.status(200).json(deleted);
      }
    })
    .catch((err) => {
      res.status(500).json({ errorMessage: `The user could not be removed --- ${err}` });
    });
});

server.put("/api/users/:id", async (req, res) => {
  const id = req.params.id;
  const changes = req.body;
  if (!changes.name || !changes.bio || changes.adoopter_id === undefined) {
    res
      .status(400)
      .json({ errorMessage: "Please provide name and bio for the user." });
  } else {
    try {
      const updated = await Person.update(id, changes);
      if (!updated) {
        res
          .status(404)
          .json({ message: "The user with the specified ID does not exist." });
      } else {
        res.status(200).json(updated);
      }
    } catch (error) {
      res
        .status(500)
        .json({ errorMessage: "The user information could not be modified." });
    }
  }
});

server.get("*", (req, res) => {
    res
        .status(404)
        .json({message: "The page you are looking for could not be found."})

})


module.exports = server; // EXPORT YOUR SERVER instead of {}
