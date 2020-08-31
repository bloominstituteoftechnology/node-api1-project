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
server.get("/users", (req, res) => {
    res.status(200).json({ data: users }); 
}); 

// POST new user
server.post("/users", (req, res) => {
    const newUser = req.body; 
    users.push(newUser); 
    res.status(201).json({ data: users }); 
}); 

