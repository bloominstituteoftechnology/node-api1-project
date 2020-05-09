const express = require("express");
const server = express();

server.get("/", (req, res) => {
  res.send("Hello World");
});

server.get("/users", (req, res) => {
    const users = [
        { 
            id: 1, 
            name: "Jane Doe", 
            bio: "Not Tarzan's Wife, another Jane" 
        },
        { 
            id: 2, 
            name: "John Doe", 
            bio: "Doe a Deer"
        }
    ]
    res.status(200).json(users);
})

server.listen(8000, () => console.log("API running on port 8000"));