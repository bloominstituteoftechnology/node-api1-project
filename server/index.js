const express = require('express');
const cors = require('cors');
const shortid = require('shortid')


const server = express();

server.use(express.json())
server.use(cors())

const sendUserError = (msg, res) => {
    return res.status(400).send({ Error: msg });
};

const idFilter = req => user => user.id === req.params.id;

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

server.get('/users/:id', (req, res) => {
    const found = users.some(idFilter(req));

    if (found) {
        res.json(users.filter(idFilter(req)));
    } else {
        res.status(400).json({ msg: `No user with the id of ${req.params.id}` });
    }
});

server.put('/users/:id', (req, res) => {
    const found = users.some(idFilter(req));

    if (found) {
        users.forEach((user, i) => {
            if (idFilter(req)(user)) {

                const updUser = {...user, ...req.body};
                user[i] = updUser
                res.json({ msg: 'User updated', updUser });
            }
        });
    } else {
        res.status(400).json({ msg: `No User with the id of ${req.params.id}` });
    }
});

server.listen(5000, () =>
    console.log('Server running on http://localhost:5000')
);