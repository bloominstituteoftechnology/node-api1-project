const express = require("express");

const server = express();

server.use(express.json());

server.get("/", (req, res) => {
  res.json({ api: "Up and running!" });
});

server.listen(8000, () => console.log("\n== API is up ==\n"));
