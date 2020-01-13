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
        message: error.message,
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
          message: "We cannot find this user"
        });
      }
    })
    .catch(error => {
      console.log(error);
    });
});

app.post("/api/users", (req, res) => {
  const newUser = req.body;

  insert(newUser)
    .then(user => {
      res.status(201).json(user);
    })
    .catch(error => {
      res.status(500).json({
        message: error.message
      });
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
          message: `${user.id} does not exist`
        });
      }
    })
    .catch(error => {
      console.log(error.message);
    });
});

app.listen(8000, () => {
  console.log("listening on 8000");
});

app.put("/api/users/:id", async (req, res) => {
  const { id } = req.params;
  const modifiedUser = req.body;

  try {
    const updatedUser = await update(id, modifiedUser);
    if (updatedUser) {
      res.status(200).json(updatedUser);
    } else {
      res.status(404).json({ message: `User with id ${id} does not exist` });
    }
  } catch (error) {
    res.status(500).json(error.message);
  }
});
