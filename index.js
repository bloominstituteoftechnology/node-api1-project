const express = require("express");
const server = express();

server.use(express.json());

const users = [
  {
    id: 1,
    name: "Bruce Wayne",
    bio: "Not Batman",
  },
  {
    id: 2,
    name: "Clark Kent",
    bio: "Not Superman",
  },
  {
    id: 3,
    name: "Diana Prince",
    bio: "Not Wonder Woman",
  },
];

server.get("/", (req, res) => {
  res.send("Hello World");
});

server.get("/api/users", (req, res) => {
  res.send(users);
});

server.get("/api/users/:id", (req, res) => {
  const userId = users.find((c) => c.id === parseInt(req.params.id));
  if (!userId) res.status(404).send("Not Found");
  res.send(userId);
});

server.post("/api/users", (req, res) => {
  if (!req.body.name || req.body.name.lenght < 3) {
    res.status(400).send("Give us your correct name");
    return;
  }
  const userPost = {
    id: users.length,
    name: req.body.name,
    bio: req.body.bio,
  };
  users.push(userPost);
  res.send(userPost);
});

server.put("/api/users/:id", (req, res) => {
  const userId = users.find((c) => c.id === parseInt(req.params.id));
  if (!userId) res.status(404).send("Not Found");
  res.send(userId);
  users.name = req.body.name;
  res.send(users);
});

server.delete("/api/users/:id", (req, res) => {
  const userId = users.find((c) => c.id === parseInt(req.params.id));
  if (!userId) res.status(404).send("Not Found");
  const index = users.indexOf(userId);
  users.splice(index, 1);

  res.send(userId);
});

server.listen(8000, () => "API is up and running on port 8000");

//   if (!req.params.id) {
//     res.status(404).json({ message: "More mistakes" });
//   } else {
//     users
//       .findById(req.params.id)
//       .then((users) => {
//         res.status(200).json(users);
//       })
//       .catch((err) => {
//         console.log(err);
//         res
//           .status(500)
//           .json({ errorMessage: "You have continued to make mistakes" });
//       });
//   }

//   users
//     .find()
//     .then((users) => {
//       res.status(200).json(users);
//     })
//     .catch((err) => {
//       console.log(err);
//       res.status(500).json({ errorMessage: "Mistakes have been made" });
//     });
