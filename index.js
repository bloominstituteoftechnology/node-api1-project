const express = require("express");

const server = express();

server.use(express.json());

server.get("/", (req, res) => {
  res.json({ message: "Hello from the Server!" });
});

server.listen(5000, () => {
  console.log("Server initialized on port 5000");
});
