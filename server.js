const express = require("express");
const shortid = require("shortid");

const server = express();

server.use(express.json());

// let users = [
//   {
//     id: shortid.generate(),
//     name: "Jane Doe",
//     bio: "Not Tarzan's Wife, another Jane",
//   },
// ];

server.get("/api/users", (req, res) => {
  // if (users.count < 1) {
  //   res
  //     .status(500)
  //     .json({ errorMessage: "The users information could not be retrieved." });
  // } else {
  //   res.status(200).json(users);
  // }
  try {
    res.status(200).json(users);
  } catch (err) {
    console.error("\nERROR", err);
    res.status(500).json({
      errorMessage: "There was an error while saving the user to the database",
    });
  }
});

server.get("/", (req, res) => {
  res.json({ api: "Up and running!" });
});

server.listen(8000, () => console.log("\n== API is up ==\n"));
