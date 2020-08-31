let users = [
    {
        id: 1, // hint: use the shortid npm package to generate it
        name: "Jane Doe", // String, required
        bio: "Not Tarzan's Wife, another Jane",  // String, required
    },
    {
        id: 2, // hint: use the shortid npm package to generate it
        name: "Jack White", // String, required
        bio: "That weird guy in about 20 bands",  // String, required
    },
    {
        id: 3, // hint: use the shortid npm package to generate it
        name: "John Wick", // String, required
        bio: "Don't fuck with his dog",  // String, required
    }
];

const express = require("express"); 
const server = express(); 
const port = 8000; 

server.listen(port, () => console.log("server up and running!!!")); 
server.use(express.json()); 

// GET 
server.get("/", (req, res) => {
    res.status(200).json({ hello: "New users!" })
}); 

// GET users
server.get("/api/users", (req, res) => {
    res.status(200).json({ data: users }); 
}); 

// POST new user
server.post("/api/users", (req, res) => {
    const newUser = req.body; 
    users.push(newUser); 
    res.status(201).json({ data: users }); 
}); 

// DELETE a user 
server.delete("/users/:id", (req, res) => {
    const id = Number(req.params.id); 
    let newUsers = users.filter(user => user.id !== id); 
    res.status(200).json(newUsers); 
}); 

// Edit something about a user PUT 
server.put("/api/users/:id", (req, res) => {
    const changes = req.body; 
    const id = Number(req.params.id); 
    let foundUser = users.find(user => user.id === id); 
    if(foundUser){
        Object.assign(foundUser, changes);
        res.status(200).json(foundUser); 
    } else {
        res.status(404).json({ message: "The user with the specified ID does not exist." })
    }
}); 
