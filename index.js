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

server.get('/', (req, res) => {
    res.json({ api: 'hi from the api' });
});

server.get('/api/users', (req, res) => {
    if(users) {
        res.status(200).json(users);
    } else {
        res.status(404).json({ errorMessage: 'Users not found' });
    }
});

server.get('/api/users/:id', (req, res) => {
    const id = req.params.id;

    const user = users.find((user) => user.id == id);

    if(user) {
        res.status(200).json(user);
    } else {
        res.status(404).json({ message: "The user with the specified ID does not exist." });
    }
});

server.post('/api/users', (req, res) => {

});


const port = 5000;
server.listen(port, () => console.log(`\n== api on port ${port} ==\n`));