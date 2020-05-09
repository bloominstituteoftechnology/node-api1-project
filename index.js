const express = require("express");
const server = express();

server.use(express.json());

let users = [
    { 
        id: 1, 
        name: "Jane Doe", 
        bio: "Not Tarzan's Wife, another Jane" 
    }
]

server.get("/api/users", (req, res) => {
    res.status(200).json(users);
});

server.get("/api/users/:id", (req, res) => {
    res.status(201).json(users);
});

server.listen(8000, () => console.log("API running on port 8000"));