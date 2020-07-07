const express = require('express');
const shortid = require('shortid');
const server = express();
server.use(express.json());

let users = [{
    id: shortid.generate(),
    name: "Jane Doe",
    bio: "Not Tarzan's wife, another Jane"
}];


server.get('/', (req, res) => {
    res.status(200).send('Hello World');
});

server.get('/api/users', (req, res) => {
    if (!users) {
        res.status(500).json({
            errorMessage: "The users information could not be retrieved"
        })
    } else {
        res.status(200).json(users)
    }
});

server.get('/api/users/:id', (req, res) => {
    const id = req.parapms.id;
    if (!users || !users.id) {
        res.status(500).json({
            errorMessage: "The user information could not be retrieved"
        })
    } else {
        const found = users.find(u => u.id === id);
        if (found) {
            res.status(200).json(user);
        } else {
            res.status(404).json({
                message: "The user with the specified ID does not exist."
            })
        }

    }
});

server.post('/api/users', (req, res) => {
    const newUser = req.body;
    if (newUser.name === undefined || newUser.bio === undefined) {
        res.status(400).json({
            errorMessage: 'Please provide name and bio for the user.'
        })
    } else {
        newUser.id = shortid.generate();
        const oldLength = users.length;
        const newLength = users.push(newUser);
        if (newLength === oldLength + 1) {
            res.status(201).json(newUser);
        } else {
            res.status(500).json({
                errorMessage: "There was an error while saving the user to the database"
            })
        }

    }

});

server.delete('/api/users/:id', (req, res) => {
    const id = req.params.id;
    if (!users || !users.id) {
        res.status(500).json({
            errorMessage: "The user could not be removed"
        })
    } else {
        const found = users.find(u => u.id === id);
        if (found) {
            users = users.filter(u => u.id !== id);
            res.status(200).json(deleted);
        } else {
            res.status(404).json({
                message: "The user with the specified ID does not exist"
            })
        }
    }
});

server.put('/api/users/:id', (req, res) => {
    const id = req.params.id;
    const changes = req.body;
    if (!users || !users.id) {
        res.status(500).json({
            errorMessage: "The user information could not be modified"
        })
    } else {
        if (changes.name === undefined && changes.bio === undefined) {
            res.status(400).json({
                errorMessage: 'Please provide name and bio for the user.'
            })
        } else {
            let found = users.find(u => u.id === id);

            if (found) {
                Object.assign(found, changes);
                res.status(200).json(found);
            } else {
                res.status(404).json({
                    message: 'The user with the specified ID does not exist'
                })
            }
        }
    }
})

const port = 8000;
server.listen(port, () => console.log(`server running on port ${port}`));