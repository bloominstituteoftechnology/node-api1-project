const express = require("express")
const shortid = require("shortid")
const server = express();
const cors = require("cors")


server.use(express.json())
server.use(cors())

let users = [
    {
        id: shortid.generate(),
        name: "Jane Doe",
        bio: "Not Tarzan's Wife, another Jane",

    },
]
server.post("/api/users", (req, res) => {
    const newUser = req.body;

    newUser.id = shortid.generate();

    if (!newUser.name || !newUser.bio){
        res.status(400).json({errorMessage: "Please provide name and bio for the user"})
    } else {
        users.push(newUser)

        res.status(201).json(newUser)
    }

    if (users.includes(newUser) === false){
        res.status(500).json({errorMessage: "There was an error saving to the database"})
    }
})
server.get("/", (req, res) => {
    res.status(200).json({api: "Up and running!"});
})
server.get("/api/users", (req, res) => {
    res.status(200).json(users);
})

server.get("/api/users/:id", (req, res) => {
    const id = req.params.id;
    const find = users.find(f => f.id === id)

    if (find){
        res.status(200).json(find)
    } else if (!find){ 
        res.status(404).json({errorMessage: "The user with the specified ID does not exist"})
    } else {
        res.status(500).json({errorMessage: "The user information could not be retrieved"})
    }
})

server.delete("/api/users/:id", (req, res) => {
    const id = req.params.id;
    const find = users.find(f => f.id === id);
    const filterOut = users.filter(f => f.id !== id)

    if(find){
        users = filterOut
        res.status(200).json(find)
    } else if (users.length === 0){
        res.status(500).json({errorMessage: "The user could not be removed"})
    } else {
        res.status(400).json({errorMessage: "User with specified ID cannot be found"})
    }
})

server.put("/api/users/:id", (req, res) => {
    const id = req.params.id;
    const changes = req.body;

    let found = users.find(h => h.id === id);

    if(!found){
        res.status(404).json({errorMessage: "User with specified ID does not exist"})
    } else if (!changes.name || !changes.bio){
        res.status(400).json({errorMessage: "Please provide name and bio"})
    } else if (found){
        Object.assign(found, changes);
        res.status(200).json(found)
    } else {
        res.status(500).json({errorMessage: "The user information could not be modified"})
    }
})


const PORT = 5003;
server.listen(PORT, () => console.log(`server running on port ${PORT}`))