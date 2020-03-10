const express = require("express");
const shortid = require("shortid");

const server = express();

let users = [
  {
    id: "qT1jhHfA",
    name: "some",
    bio: "bio"
  },
  {
    id: "LVENEk1b",
    name: "some",
    bio: "bio"
  },
  {
    id: "NpzNQvfJ",
    name: "some",
    bio: "bio"
  },
  {
    id: "H4jnLNAkS",
    name: "some",
    bio: "bio"
  }
];

server.use(express.json());

server.get("/", (req, res) => {
  res.status(200).json({ api: "running..." });
});

//post users
server.post("/api/users", (req, res) => {
  const { name, bio } = req.body;
  const userInfo = req.body;
  userInfo.id = shortid.generate();
  users.push(userInfo);

  if (!name || !bio) {
    res
      .status(400)
      .json({ errorMessage: "Please provide name and bio for the user." });
  }

  res.status(201).json(userInfo);
});

//get users
server.get("/api/users", (req, res) => {
  res.status(200).json(users);
});

//get user by id
server.get("/api/users/:id", (req, res) => {
  const { id } = req.params;
  const user = users.filter(eachUser => {
    return eachUser.id === id;
  });

  //not if id is true, but if
  if (!user[0]) {
    res.status(400).json({
      message: "The user with the specified ID does not exist."
    });
  }

  res.status(200).json(user);
});

const PORT = 5001;
server.listen(PORT, () =>
  console.log(`/n ** API on http://localhost:${PORT} **\n`)
);
