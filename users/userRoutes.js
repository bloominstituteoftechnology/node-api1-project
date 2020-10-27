const express = require("express");
const shortid = require("shortid");
const generate = require("shortid").generate;
const router = express.Router();

const users = [
  {
    id: generate(),
    name: "Jane Doe",
    bio: "Not Tarzan's Wife, another Jane",
  },
];

router.get("/", (req, res) => {
  try {
    res.status(200).json(users);
  } catch (error) {
    res
      .status(500)
      .json({ errorMessage: "The users information could not be retrieved." });
  }
});

router.post("/", (req, res) => {
  const { name, bio } = req.body;

  try {
    if (!name || !bio) {
      res
        .status(400)
        .json({ errorMessage: "Please provide name and bio for the user." });
    } else {
      const newUser = { id: generate(), name, bio };

      users.push(newUser);

      res.status(201).json(newUser);
    }
  } catch (error) {
    res
      .status(500)
      .json({ errorMessage: "The users information could not be retrieved." });
  }
});

router.delete("/:id", (req, res) => {
  const { id } = req.params;
  try {
    if (!users.find((user) => user.id === id)) {
      res.status(404).json({ message: "The user with the specified ID does not exist." });
    } else {
      users = users.filter((user) => user.id !== id);
      res
        .status(200)
        .json({ message: `the used with the id ${id}, was deleted ` });
    }
  } catch (error) {
    res.status(500).json({ message: "something went wrong" });
  }
});

router.put("/:id", (req, res) => {
  const { id } = req.params;

  const { name, bio } = req.body;

  const indexOfUser = users.findIndex((user) => user.id === id);

  if (indexOfUser !== -1) {
    users[indexOfUser] = { id, name, bio };

    res.status(200).json({ id, name, bio });
  } else {
    res.status(404).json({ errorMessage: "The user information could not be modified." })
  }
});

module.exports = router;
