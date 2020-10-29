const express = require('express');
const app = express();

app.use(express.json());

let users = [
    {
        id: 0,
        name: "Clarke Griffin",
        bio: "Won Heda",
    },
    {
        id: 1,
        name: "Lexa com Trikru",
        bio: "The Commander",
    },
    {
        id: 2,
        name: "Octavia Blake",
        bio: "The Red Queen",
    }
]

app.get('/', (req, res) => {
    res.json({ api: 'API is running...' })
})

app.post('/api/users', (req, res) => {
    const body = req.body;

    if (!body.name || !body.bio) {
        res.status(400).json({ errorMessage: "Please provide name and bio for the user." })
    } else {
        users.push(body);
        const newUser = users.find((user) => user.id == body.id);
            if(newUser) {
                res.status(201).json(users);
            } else {
                res.status(500).json({ errorMessage: "There was an error while saving the user to the database" })
            }
    }
});

app.get('api/users/:id', (req, res) => {
    try {
        const userId = req.params.id;
        const user = users.find((user) => user.id == userId);
        if (user) {
            res.status(200).json(user);
        } else {
            res.status(404).json({ message: "The user with the specified ID does not exist." })
        }
    } catch (err) {
        res.status(500).json({ errorMessage: "The user information could not be retrieved." })
    }
})



app.get('/api/users', (req, res) => {
    if (users) {
        res.json(users);
    } else {
        res.status(500).json({ errorMessage: "The users information could not be retrieved." })
    }
})


app.delete('api/user/:id', (req, res) => {
    const reqId = req.params.id;
    let user = users.filter(user => {
        return user.id == reqId;
    })[0];
    if (user) {
        const index = users.indexOf(user);
        users.splice(index, 1);
        const deletedUser = user.find((user) => user.id === req.params.id);
        if (deletedUser) {
            res.status(500).json({ errorMessage: "The user could not be removed" })
        }
    }
})

app.put('/api/users/:id'), (req, res) => {
    const body = req.body;
    const id = req.params.id;

    if(!body.name || !body.bio) {
        res.status(400).json({ errorMessage: "Please provide name and bio for the user." })
    } else {
        const user = user.find((user) => user.id === id);
        if (user) {
            user = users.map((user) => {
                return user.id == id ? { ...body, id} : user;
            })
            const newUser = user.find((user) => user.id == id);
            if (newUser) {
                res.json(users);
            } else {
                res.status(500).json({ errorMessage: "The user information could not be modified." })
            }
        } else {
            res.status(404).json({ message: "The user with the specified ID does not exist." })
        }
    }
}

const PORT = 5000;
app.listen(PORT, () => {
    console.log(`*** listening on port ${PORT}`)
})


