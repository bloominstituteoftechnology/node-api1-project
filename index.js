const express = require('express');
const shortid = require('shortid');

const server = express();

let users = [
    {
        id: shortid.generate(),
        name: "justin russell",
        bio: "this is my first day doing backend"
    },
]

// middleware
server.use(express.json());

// endpoints
server.get('/', (req, res) => {
    res.json({ api: "running..." });
});

server.get("/api/users", (req, res) => {
    res.json(users);
});

server.post("/api/users", (req, res) => {
    const userInfo = req.body;
    users.push(userInfo);
    res.status(201).json(users);
});



const port = 5000;
server.listen(port, () => console.log(`api on port ${port}`));