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

    users = users.filter(user => user.id === userID)
    if (!users[0]) {
        res.status(404).json({ error: `User with id ${userID} is not found`})
    } else if (!users) {
        res.status(500).json({ errMessage: "Could not process action" })
    } else {
        res.status(200).json(users);
    }
    
})


server.get("/", (req, res) => {
    res.status(200).json({ api: "UP" })
})

module.exports = server;