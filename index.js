const express = require("express");
const e = require("express");
const server = express();

server.use(express.json());
const PORT = 5000;

let users = [
    {
        id: "a_unique_id",
        name: "Jane Doe",
        bio: "Not Tarzan's Wife, another Jane",
    }
];

server.listen(PORT, () => {
    console.log(`listening on port ${PORT}...`);
});

// START

server.post("/api/users", (req, res) => {
    const userInfo = req.body;

    if(userInfo.name || userInfo.bio) {
        if(users.push(userInfo)) {
            res.status(201).json({ userInfo })
        } else {
            res.status(500).json({ errorMessage: "There was an error while saving the user to the database" })
        }
    } else {
        res.status(400).json({ errorMessage: "Please provide name and bio for the user." });
    }
});

server.get("/api/users", (req, res) => {
    if(!users) {
        res.status(500).json({ errorMessage: "The users information could not be retrieved." });
    } else {
        res.status(200).json(users);
    }
});

server.get("/api/users/:id", (req, res) => {
    const id = req.params.id;

    let fetch = users.find(user => id === user.id);

    if (fetch) {
        res.status(200.).json(fetch);
    } else if (fetch === undefined) {
        res.status(404).json({ errorMessage: "The user information could not be retrieved." });
    } else {
        res.status(500).json({ message: "The user with the specified ID does not exist." });
    }
});

server.delete("/api/users/:id", (req, res) => {
    const id = req.params.id;

    let removed = users.find(user => user.id === id);

    if (removed) {
        users = users.filter(user => user.id !== id)
        res.status(200).json(removed);
    } else if (removed === undefined) {
        res.status(500).json({ errorMessage: "The user could not be removed."})
    } else {
        res.status(404).json({ message: "The user with the specified ID does not exist." })
    }
});

server.put("/api/users/:id", (req, res) => {
    const id = req.params.id;
    const update = req.body;
    update.id = id;

    let array = users.find(user => id === user.id);

    if(update.name || update.bio) {
        if(array !== -1) {
            users[array] = update;
            res.status(200).json({ user : array });
        } else {
            res.status(500).json({ errorMessage: "The user information could not be modified." });
        }
    } else if (update === undefined) {
        res.status(400).json({ errorMessage: "Please provide name and bio for the user." });
        
    } else {
        res.status(404).json({ message: "The user with the specified ID does not exist." });
    }
});