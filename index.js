console.log("Hello from the server!");

const express = require("express");
const shortid = require("shortid");

const server = express();
server.use(express.json());

let users = [
  {
    id: shortid.generate(),
    name: "Kyle",
    bio: "Cool Guy",
  },
];

const User = {
  getAll() {
    return users;
  },
};

server.get("/api/users", (req, res) => {
  const users = User.getAll();
  res.status(200).json(users);
});

server.get("/api/users/:id", (req, res) => {
    const {id} = req.params

    const user = users.find(user => user.id === id)

    if (user) {
    res.status(200).json(user) 
    } else {
        res.status(500).json({errorMessage: "This user could not be identified"})
    }
})

server.post("/api/user", (req, res) => {
  const newUser = {
    name: req.body.name,
    bio: req.body.bio,
    id: shortid.generate(),
  };
  if (newUser.name.trim() === '' || newUser.bio.trim() === '') {
    res
      .status(400)
      .json({ errorMessage: "Please provide name and bio for the user" });
  } else {
    users.push(newUser);
    res.status(201).json(newUser);
  }
});

server.delete("/api/users/:id", (req, res) => {
    const { id } = req.params

    const user = users.find(user => user.id === id) 
    if (user) {
        users = users.filter(u => u.id !== id)
        res.status(200).json({success: "user was deleted."})
    } else {
        res.status(500).json({errorMessage: "User was not found."})
    }
});

server.put("/api/users/:id", (req, res) => {
    const changes = {
        name: req.body.name,
        bio: req.body.bio,
        id: req.params.id
    }
    const { id } = req.params

    const user = users.find(user => user.id === id)
    if (user) {
        users = users.filter(u => u.id !== id)
        users.push(changes)
        res.status(200).json({success: "user was updated."})
    } else {
        res.status(500).json({errorMessage: "User was not found."})
    }
})





server.listen(5000, () => {
  console.log("listening on port 5000");
});

//done