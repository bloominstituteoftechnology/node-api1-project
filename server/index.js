const express = require('express');
const cors = require('cors');
const shortid = require('shortid')


const server = express();

server.use(express.json())
server.use(cors())

const sendUserError = (msg, res) => {
    return res.status(400).send({ Error: msg });
};

const users = [
    {
        name: 'Matt',
        bio: 'Doom Fanatic and Computer lover',
        id: shortid.generate()
    }
];

server.get('/users', (req, res) => {
    res.json(users);
});

server.post('/users', (req,res) => {
    const newUser = {
        ...req.body,
        id: shortid.generate()
    };
    if (!newUser.name || !newUser.bio ) {
        return sendUserError(
            'Please include a name and a bio for the User', res
        );
    }

    users.push(newUser);
    res.status(201).json(users);
})





server.listen(5000, () =>
    console.log('Server running on http://localhost:5000')
);