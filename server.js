let express = require("express");
let shortID = require("shortid");
let cors = require("cors");
let helmet = require("helmet");

let server = express();
server.use(helmet());
server.use(cors());
server.use(express.json()); // enables json for communincating between front and back


let users = [
    {
        id: shortID.generate(),
        name: "Fernando",
        bio: "Lambda student, currently on unit 4"
    },
    {
        id: shortID.generate(),
        name: "Legacy",
        bio: "Ingenius code monkey"
    }
]

server.get("/users", (req, res) => { // GET gets all users
    res.status(200).json(users);
})

server.get("/users/:id", (req, res) => {
    let userID = req.params.id;

    let user = users.filter(user => user.id === userID)
    if (!user[0]) {
        res.status(404).json({ error: `User with id ${userID} is not found`})
    } else if (!user) {
        res.status(500).json({ errMessage: "Could not process action" })
    } else {
        res.status(200).json(user);
    }
    
})

server.post("/users", (req, res) => {
    let newUser = req.body;
    newUser.id = shortID.generate();
    if(!newUser.name || !newUser.bio) {
        res.status(400).json({ message: "Missing information"});
    } else if(!newUser) {
        res.status(500).json({ error: "Could not process request"})
    } else {
        users.push(newUser);
        res.status(201).json(newUser);
    }
})

server.delete("/users/:id", (req, res) => {
    let userID = req.params.id;
    let deleted = users.find(user => user.id === userID)

    if(!deleted) {
        res.status(404).json({ message: "The user with the specified ID does not exist." })
    } else if(deleted) {
        res.status(200).json(users = users.filter(user => user.id !== userID))
    } else {
        res.status(500).json({ errorMessage: "The user could not be removed" })
    }
});

// server.put("/users/:id", (req, res) => {
//     let userID = req.params.id;
//     let updates = req.body;
//     let toBeUpdated = users.map(user => user.id === userID)

//     if(!toBeUpdated) {
//         res.status(404).json({ message: "The user with the specified ID does not exist." })
//     } else if(!updates.name || !updates.bio) {
//         res.status(400).json({ errorMessage: "Please provide name and bio for the user." })
//     } else if (toBeUpdated) {
//         toBeUpdated = {
//             // ...toBeUpdated,
//             name: req.body.name,
//             bio: req.body.bio
//         }
//     } else {
//         res.status(500).json({ errorMessage: "The user information could not be modified." })
//     }

//     res.status(200).json()
// })

server.put("/users/:id", (req, res) => {
    const id = req.params.id;
    const changes = req.body;

    let found = users.find(h => h.id === id);

    if (!found) {
        res.status(404).json({ message: "The user with the specified ID does not exist." })
    } else if(!changes.name || !changes.bio) {
        res.status(400).json({ errorMessage: "Please provide name and bio for the user." })
    } else if(found) {
        Object.assign(found, changes);
        res.status(200).json(found);
    } else {
        res.status(500).json({ errorMessage: "The user information could not be modified." })
    }

});

server.get("/", (req, res) => {
    res.status(200).json({ api: "UP" })
})

module.exports = server;