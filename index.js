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
    const userInfo = req.body;

    // userInfo.id = shortid.generate();

    users.push(userInfo);

    // const userName = users.find((userName) => userName.name == "");

    if (users.name || users.bio === "") {
        res.status(400).json({ message: "Please provide name and bio for the user."});
    } else {
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