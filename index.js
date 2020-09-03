const express = require('express');
const shortid = require('shortid');

const server = express();

server.use(express.json());

let users = [
    {
        id: shortid.generate(),
        name: 'Jane Doe',
        bio: "Not Tarzan's wife "
    },
];

server.listen(5000, () => {
    console.log('server is listening on port 5000...');
});

// server.get('/', (req, res) => {
//     res.send('hello world...');
// });

// server.get('/users', (req, res) => {

// })

server.post('/api/users', (req, res) => {
    const userInfo = req.body;

    if (userInfo) {
        id = shortid.generate();
        users.push(userInfo);

        res.status(201).json(userInfo);
    } else {
        res.status(400).json({ message: "Please provide name and bio for the user." });
    }
});

server.get('/api/users', (req, res) => {

    res.status(200).json(users);
});

