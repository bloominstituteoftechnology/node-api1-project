const express = require("express");
const server = express();
const model = require("./users/model");
require("colors");

server.use(express.json());

// | Method | URL            | Description                                                                                            |
// | ------ | -------------- | ------------------------------------------------------------------------------------------------------ |
// | POST   | /api/users     | Creates a user using the information sent inside the `request body`.                                   |
// | GET    | /api/users     | Returns an array users.                                                                                |
// | GET    | /api/users/:id | Returns the user object with the specified `id`.                                                       |
// | DELETE | /api/users/:id | Removes the user with the specified `id` and returns the deleted user.                                 |
// | PUT    | /api/users/:id | Updates the user with the specified `id` using data from the `request body`. Returns the modified user |

server.post("/api/users", (req, res) => {
  model.insert(req.body).then((newUser) => {
    res.send(newUser);
  });
});

server.get("/api/users", (req, res) => {
  model
    .find()
    .then((data) => res.send(data))
    .catch((err) => {
      res.status(500);
      res.render("error", { error: err });
    });
});

server.get(`/api/users/:id`, (req, res) => {
  const id = req.params.id;
  console.log(id)
  model
    .findById(id)
    .then((user) => res.send(user))
    .catch((err) => {
      res.status(500);
      res.render("error", { error: err });
    });
});

server.delete("/api/users", (req, res) => {
  res.send("DELETE to /api/users/:id");
});

server.put("/api/users", (req, res) => {
  res.send("PUT to /api/users/:id");
});

module.exports = server;
