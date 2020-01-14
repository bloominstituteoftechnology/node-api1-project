// implement your API here

const express = require("express");
const cors = require("cors");

const { findById, find, insert, remove, update } = require("./data/db");

const app = express();

app.use(express.json());

app.use(cors());

app.get("/api/users", (req, res) => {
  find()
    .then(data => {
      res.status(200).json(data);
    })
    .catch(error => {
      res.status(500).json({
        message: "The users information could not be retrieved.",
        stack: error.stack
      });
    });
});

app.get("/api/users/:id", (req, res) => {
  const { id } = req.params;

  findById(id)
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
      res.status(500).json({
        message: "The users information could not be retrieved.",
        stack: error.stack
      });
      console.log(error.message);
    });
});

app.post("/api/users", (req, res) => {
  const newUser = req.body;

  insert(newUser)
    .then(user => {
      if (!user.name && !user.bio) {
        // console.log(user.name);
        return res.status(400).json({
          message: "Please provide name and bio for the user."
        });
      }
    })
    .then(user => {
      user && res.status(201).json(user);
    })

    .catch(error => {
      res.status(500).json({
        message: "There was an error while saving the user to the database",
        stack: error.stack
      });
      console.log(error);
    });
});

app.delete("/api/users/:id", (req, res) => {
  const { id } = req.params;

  remove(id)
    .then(user => {
      if (user) {
        res.status(202).json(user.id);
      } else {
        res.status(404).json({
          message: `The user with the specified ID does not exist.`
        });
      }
    })
    .catch(error => {
      res.status(500).json({
        message: "The user could not be removed",
        stack: error.stack
      });
      console.log(error);
    });
});

app.put("/api/users/:id", async (req, res) => {
  const { id } = req.params;
  const modifiedUser = req.body;

  try {
    const updatedUser = await update(id, modifiedUser);

    if (modifiedUser.bio && updatedUser && modifiedUser.name) {
      res.status(200).json(updatedUser);
    } else if (modifiedUser.name && modifiedUser.bio) {
      return res.status(404).json({
        message: "The user with the specified ID does not exist."
      });
    } else
      return res
        .status(400)
        .json({ message: `Please provide name and bio for the user.` });
  } catch (error) {
    res
      .status(500)
      .json({ message: "The user information could not be modified" });
  }
});

app.listen(8000, () => {
  console.log("listening on 8000");
});
