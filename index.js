const express = require("express");

const server = express();

server.get("/api/users", (req, res) => {
  const users = [
    {
      id: "a_unique_id", // hint: use the shortid npm package to generate it
      name: "Jane Doe", // String, required
      bio: "Not Tarzan's Wife, another Jane", // String, required
    },
  ];

  res.status(200).json(users);
});

server.post("/api/users", (req, res) => {
  res.status(200).json(users);
});

server.get("/api/users/:id", (req, res) => {
  res.status(200).json(users);
});

server.delete("/api/users/:id", (req, res) => {
  res.status(200).json(users);
});

server.put("/api/users/:id", (req, res) => {
  res.status(200).json(users);
});
