const express = require("express");
const shortid = require("shortid");

const server = express();

server.use(express.json());

let users = [
  {
    id: shortid.generate(),
    name: "Jane Doe",
    bio: "Not Tarzan's Wife, another Jane",
  },
];

server.get("/api/users", (req, res) => {
  try {
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json({
      errorMessage: "There was an error while saving the user to the database",
    });
  }
});

// server.post("/api/users", (req, res) => {
//   try {
//     const userInfo = {
//       id: shortid.generate(),
//       name: req.body.name,
//       bio: req.body.bio,
//     };
//     users.push(userInfo);
//     res.status(201).json(userInfo);
//   } catch (err) {
//     console.error("\nERROR", err);
//     res
//       .status(400)
//       .json({ errorMessage: "Please provide name and bio for the user." });
//   }
// });

server.get("/", (req, res) => {
  res.json({ api: "Up and running!" });
});

server.listen(8000, () => console.log("\n== API is up ==\n"));
