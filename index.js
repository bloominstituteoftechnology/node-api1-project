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

const PORT = 5000;

server.listen(PORT, () => {
    console.log(`listening on port ${PORT}...`);
});

// START

server.get("/api/users", (req, res) => {
    if(!users) {
        res.status(500).json({ errorMessage: "The users information could not be retrieved." });
    } else {
        res.status(200).json(users);
    }
    
});

server.post("/api/users", (req, res) => {
    const user = req.body;

    if(!username || !user.bio) {
        res.status(400).json({ errorMessage: "Please provide name and bio for the user." });
    } else {
        users.push(user);
        res.status(201).json({ user: user })
    }

    // { errorMessage: "There was an error while saving the user to the database" }

});

server.get("/api/users/:id", (req, res) => {
    const id = req.params.id;

    if (!user) {
        res.status(404).json({ message: "The user with the specified ID does not exist." })
    } else {
        res.status(500).json({ errorMessage: "The user information could not be retrieved."})
    }
});

server.delete("/api/users/:id", (req, res) => {
    const id = req.params.id;

    if (!user) {
        res.status(404).json({ message: "The user with the specified ID does not exist." })
        res.status(500).json({ errorMessage: "The user could not be removed."})
    } else {

    }

});

server.put("/api/users/:id", (req, res) => {

    //  { message: "The user with the specified ID does not exist." }
    // { errorMessage: "Please provide name and bio for the user." }
})