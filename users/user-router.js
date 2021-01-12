const express = require("express");

const router = express.Router();
const {
  findAll,
  findById,
  create,
  update,
  remove,
} = require("./user-model.js");

// Get ALL Users

router.get("/", (req, res) => {
  findAll()
    .then((users) => {
      res.status(200).json(users);
    })
    .catch((error) => {
      res.status(500).json({ message: error.message });
    });
});

// Get User by ID param

router.get("/:id", (req, res) => {
  const { id } = req.params;

  findById(id)
    .then((user) => {
      if (!user) {
        res
          .status(404)
          .json({ message: `User with id of ${id} cannot be found` });
      } else {
        res.status(200).json(user);
      }
    })
    .catch((error) => {
      res.status(500).json({ message: error.message });
    });
});

// Create a new User

router.post("/", async (req, res) => {
  const user = req.body;
  if (!user.name || !user.bio) {
    res.status(400).json({
      message:
        "Please provide name and bio for the user. These fields are required.",
    });
  } else {
    try {
      const newlyCreated = await create(user);
      res.status(201).json(newlyCreated);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
});

// UPDATE an existing user by id

router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const changes = req.body;

  if (!changes.name || !changes.bio) {
    res.status(400).json({
      errorMessage: "Please provide updated name and/or bio for the user.",
    });
  } else {
    try {
      const updated = await update(id, changes);
      if (updated == null) {
        res.status(404).json({
          message: `The user with the specified ID of ${id} does not exist`,
        });
      } else {
        res.status(200).json(updated);
      }
    } catch (error) {
      res
        .status(500)
        .json({ errorMessage: "The user information could not be modified" });
    }
  }
});

//DELETE an existing user by id

router.delete("/:id", (req, res) => {
  const { id } = req.params;
  remove(id)
    .then((deleted) => {
      if (!deleted) {
        res.status(404).json({
          message: `The user with the specified ID of ${id} does not exist.`,
        });
      } else {
        res.status(200).json(deleted);
      }
    })
    .catch((error) => {
      res
        .status(500)
        .json({ errorMessage: "The user could not be removed", error });
    });
});

module.exports = router;
