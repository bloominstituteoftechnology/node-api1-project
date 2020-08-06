const express = require("express")

const db = require('./index');

const server = express();

server.use(express.json());

server.get('/', (req, res) => {
  res.json({ message: 'Welcome, To the Cloud' });
});

server.get('/users', (req, res) => {
  // getting a list of my users from my created Database
  const users = db.getUsers();
  res.json(users);
});

// specific user by their ID 
server.get("/users/:id", (req, res) => {
    const id = req.params.id
    const user =db.getUserById(id)
    if (user) {
        res.json(user)
    } else {
        res.status(404).json({ message: "Go find user Please" })
    }
})

server.post("/users,", (req, res) => {
    const newUser = db.createUser({
        name: req.body.name,
    })
    res.status(201).json(newUser)
})
