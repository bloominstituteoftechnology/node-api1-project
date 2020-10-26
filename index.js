// Step 1 - Dependencies
const express = require("express");
const generate = require("shortid").generate;

// Step 2 - Instantiate and Configure Server
const app = express();
app.use(express.json());

// Step 3 - Port Number
const PORT = 5000;

// Step 4 - Fake Data
let users = [
  { id: generate(), name: "Choco", bio: "Loves chocolate" },
  { id: generate(), name: "Nilla", bio: "Loves vanilla" },
];

// Step 5 - Endpoints
// [GET] all users
app.get("/users", (req, res) => {
  if (!users) {
    res
      .status(500)
      .json({ errorMessage: "The users information could not be retrieved." });
  }
  res.status(200).json(users);
});

// [GET] specific user
app.get("/users/:id", (req, res) => {
  const { id } = req.params;
  const user = users.find((user) => user.id === id);
  if (!user) {
    res.status(404).json({
      message: "The user with the specified ID does not exist.",
    });
  } else {
    res.status(200).json(user);
  }
});

// [POST] new user
app.post("/users", (req, res) => {
  const { name, bio } = req.body;
  if (!name || !bio) {
    res.status(400).json({
      errorMessage: "Please provide name and bio for the user.",
    });
  } else {
    const newUser = { id: generate(), name, bio };
    users.push(newUser);
    if (!users) {
      res.status(500).json({
        errorMessage:
          "There was an error while saving the user to the database",
      });
    }
    res.status(201).json(newUser);
  }
});

// [DELETE] Delete user
app.delete("/users/:id", (req, res) => {
  const { id } = req.params;
  try {
    if (!users.find((user) => user.id === id)) {
      res.status(404).json({ message: `Can't delete user, not found.` });
    } else {
      users = users.filter((user) => user.id !== id);
      res.status(200).json({ message: `User with id ${id} got deleted.` });
    }
  } catch (error) {
    res.status(500).json({ message: "Something really broke" });
  }
});

// [PUT] Edit user
app.put("/users/:id", (req, res) => {
  const { id } = req.params;
  const { name, bio } = req.body;
  const indexOfUser = users.findIndex((user) => user.id === id);

  if (indexOfUser !== -1) {
    users[indexOfUser] = { id, name, bio };
    res.status(200).json({ id, name, bio });
  } else {
    res.status(404).json({
      message: `No user with id ${user}`,
    });
  }
});

// Catch-all endpoint (404 not found)
app.use("*", (req, res) => {
  res.status(404).json({ message: "I did something wrong, help!" });
});

// Step 6 - Listen for incoming requests
app.listen(PORT, () => {
  console.log(`Listening on Port ${PORT}`);
});
