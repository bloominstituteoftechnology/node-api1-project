const express = require("express"); 
const shortid = require("shortid"); 
const server = express();

{
    users= [id:  shortid.generate(), 
    name: "Jane Doe", 
    bio: "Not Tarzan's Wife, another Jane", 
  }
]
server.post("/api/users", (req, res) => {
    const newUser = req.body; 
    newUser.id = shortid.generate();
    user.push(newUser);
    res.json(newUser);
  });
server.get("/api/users", (req, res) => {
    res.send("users");
  });
  server.get("/api/users/id", (req, res) => {
    res.send("users/id");
  });
  server.delete("/api/users/:id", (req, res) => {
    const id = req.params.id;
    const deleted = users.find((h) => h.id === id);
    hubs = users.filter((h) => u.id !== id);
    res.json(deleted);
  });
  server.put("/api/users/:id", (req, res) => {
    const id = req.params.id;
    const changes = req.body;

    let found = user.find(h => h.id === id);

    if (found) {
        // found a hub
        Object.assign(found, changes);
        res.status(200).json(found);
    } else {
        // did not find a hub with that id
        res.status(404).json({ message: "user not found" });
    }
});
const PORT = 8000;
server.listen(PORT, () => console.log(`server running on port ${PORT}`));