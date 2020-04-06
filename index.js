console.log("\n === index.js executed!! ===\n")
const express = require("express");
const server = express();
const port = 5000;
server.listen(port, () => console.log(`\n== api on port ${port} ==\n`));

let users = [
    {
        id: 1,
        name: "Jane Doe",
        bio: "Not Tarzan's Wife, another Jane",
    }
]

// middleware
server.use(express.json());

// endpoints

server.get("/", (req, res) => {
    res.json({api: "running...!"});
    res.send('welcome');
});

server.get("/users", (req, res) => {
    res.json(users);
    if (users) {
        res.status(200).json(users);
    } else {
        res.status(500).json({errorMessage: "The users information could not be retrieved."})
    }
});

server.get("/users/:id", (req, res) => {
    const id = req.params.id;
    const user = users.find((user) => user.id == id);

    if (user) {
        res.status(200).json(user);
    } else {
        res.status(500).json({errorMessage: "The users information could not be retrieved."})
    }
});

