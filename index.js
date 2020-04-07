const express = require('express');

const server = express();

let users = [
    {
        id: 1,
        name: "Jane Doe",
        bio: "Not Tarzan's Wife, another Jane1"
    },

    {
        id: 2,
        name: "Jane Doe",
        bio: "Not Tarzan's Wife, another Jane2"
    },

    {
        id: 3,
        name: "Jane Doe",
        bio: "Not Tarzan's Wife, another Jane3"
    },
];

server.use(express.json());

// .GETs
server.get('/', (req, res) => {
    res.json({ api: 'hi from the api' });
});

server.get('/api/users', (req, res) => {
    if(users) {
        res.status(200).json(users);
    } else {
        res.status(500).json({ errorMessage: "The users information could not be retrieved." });
    }
});

server.get('/api/users/:id', (req, res) => {
    const id = req.params.id;

    const user = users.find((user) => user.id == id);

    if(user) {
        res.status(200).json(user);
    } else if (user) {
        res.status(500).json({ errorMessage: "The user information could not be retrieved." });
    } else {
        res.status(404).json({ errorMessage: "The user with the specified ID does not exist." });
    }
});


// .POSTs
server.post('/api/users', (req, res) => {
    const userInfo = req.body;
    const { name, bio } = req.body;

    if (!name || !bio) {
        res.status(400).json({ errorMessage: "Please provide name and bio for the user." })
    } else if (userInfo) {
        users.push(userInfo);
        res.status(201).json(users);
    } else  {
        res.status(500).json({ errorMessage: "There was an error while saving the user to the database" });
    }
});

// DELETEs
server.delete('/api/users/:id', (req, res) => {
    const userID = req.params.id;
    const foundUser = users.find((person) => person.id == userID);
  
    if (foundUser) {
      users = users.filter((user) => user.id != userID);
      res.status(200).json(users);
    } else if (user) {
      res.status(500).json({ message: "The user could not be removed" });
    } else {
      res
        .status(404)
        .json({ errorMessage: "The user with the specified ID does not exist." });
    }
});

// PUTs
server.post('/api/users', (req, res) => {

});


const port = 5000;
server.listen(port, () => console.log(`\n== api on port ${port} ==\n`));