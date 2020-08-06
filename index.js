const express = require("express");

const db = require("./database");
const { request } = require("express");

const port = 5000;

const server = express();

server.use(express.json());


server.listen(port, () => {
    console.log(`server listening on port ${port}`);
});
server.get("/", (req, res) => {
    res.send("Hello Word from Express!");
});

server.get("/users", (req, res) => {
    const users = db.getUsers();
    res.status(200).send(users);

});

server.get("/users/id", (req, res) => {
    const id = req.params.id;

    const user = db.getUserById(id);

    if(user){
        res.jason(user);
    } else {
        res.status(404).json({message: "User Not Found"});
    }
});

server.post("/users", (req, res) => {
    const newUser = db.createUser({
       name: req.body.name,
       bio: req.body.bio
    });
    console.log("new user", newUser);
    res.status(201).json(newUser);

});

server.put("/users/:id", (req,res) => {
    const user = db.getUserById(req.params.id);
    if(user){
        db.updateUser(req.params.id,
            {name: req.body.name, bio: req.body.bio})
    }else{
        res.status(404).json({
            message: "User Not Found"
        });
    }
});

server.delete("/users/:id", (req, res) => {
    const user = db.getUserById(req.params.id);
    if(user){
        db.deleteUser(req.params.id);
        res.status(204).end();
    } else {
        res.status(404).json({
            message: "User Not Found"
        });
    }
})