const express = require('express');
const shortid = require('shortid');

// console.log(shortid.generate());

const server = express();

let users = [
    {
    // id: shortid.generate(), // hint: use the shortid npm package to generate it
    id: 1,
    name: "", // String, required
    bio: "",  // String, required
  }
]

server.use(express.json());

server.post('/api/users', (req, res) => {
    const {name, bio} = req.body;    

    // req.body.id = shortid.generate();    

    if (!name || !bio) {
        res.status(400).json({ message: "Please provide name and bio for the user."});
    } else {
        users.push(req.body);
        res.status(201).json(users);
    }    
})

server.get('/api/users', (req, res) => {
    res.json(users);
})

server.get('/api/users/:id', (req, res) => {    
    const id = req.params.id;

    const user = users.find((user) => user.id == id);

    if (user) {
        res.status(200).json(user);
    } else {
        res.status(404).json({ message: "User not found" });
    }    
});

const port = 3333;
server.listen(port, () => console.log(`\n== api on port ${port} ==\n`));