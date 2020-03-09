const express = require("express");
const shortId = require("shortid");

const server = express();

let users = [];

server.use(express.json());

server.post("/api/users", (req, res) => {
  const userInfo = req.body;
  //userInfo.id = shortId.generate();
  users.push(userInfo);

  if (!userInfo.name || !userInfo.bio) {
    res
      .status(400)
      .json({ errorMessage: "Please provide name and bio for the user" });
  } else if (!userInfo) {
    res.status(500).json({
      errorMessage: "There was an error while saving the user to the database"
    });
  } else {
    res.status(201).json(userInfo);
  }
});

server.get("/api/users", (req, res) => {
  if (!users) {
    res
      .status(500)
      .json({ errorMessage: "The users information could not be retrieved" });
  } else {
    res.status(200).json(users);
  }
});

server.get(`/api/users/:id`, (req, res) => {
  const userId = req.params.id;
  const singleUser = users.find((el) => el.id === Number(userId));

  if (!singleUser)
    res
      .status(404)
      .json({ errorMessage: "The user with the specified ID does not exist" });
  if (!userId) {
    res
      .status(500)
      .json({ errorMessage: "The user information could not be retrieved" });
  }
  res.status(200).json(singleUser);
});

const PORT = 5000;
server.listen(PORT, () =>
  console.log(`\n ** API on http://localhost:${PORT} ** \n`)
);
