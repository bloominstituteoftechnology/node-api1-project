const express = require("express");
const shortid = require("shortid");

const server = express();
const PORT = 5000;

let users = []

server.use(express.json());

server.get("/hello", (req, res) => {
  res.status(201).json({ hello: "Jason" });
});

server.post("/api/users", (req, res) => {
    const usersInfo = req.body
    usersInfo.id = shortid.generate()
    users.push(usersInfo)
    res.status(201).json(usersInfo)
})

server.get("/api/users", (req, res) => {
    res.status(200).json(users)
})

server.get("/api/users/:id", (req, res) => {
    res.status(200).json(users)
})

server.patch("/api/users/:id", (req, res) => {
    res.status(200).json(users)
})

server.delete("/api/users/:id", (req, res) => {
    res.status(204);
})

server.listen(PORT, () =>
  console.log(`\n ** API on http://localhost:${PORT}  **\n`)
);
