const express = require("express");
const cors = require("cors")
const server = express();

server.use(express.json());
server.use(cors());

let users = []
for (var i = 1; i < 25; i++) {
    users.push({ id: i, name: `thing ${i}`, bio: "full-stack developer" })
}

users.findUser = (id) => {
    const promise = new Promise((resolution, rejection) => {
        const found = users.find(user => user.id === parseInt(id))
        if (found) {
            resolution(found)
        } else if (!found) {
            resolution(found)
        }
        rejection("Error finding user in db")
    })
    return promise
}

let lessons = []

server.get('/', (req, res) => {
    res.json({
        message: "World hello!"
    })
})

server.post('/api/users', (req, res) => {
    const requiredProperties = ['name', 'bio']
    for (const element of requiredProperties) {
        if (!Object.keys(req.body).includes(element)) {
            return res.status(400).json({ errorMessage: "Please provide both name and bio"})
        }
    }
    const usersLength = users.length
    users.push({...req.body, id: users.length })
    if (usersLength === users.length) {
        res.status(500).json({ errorMessage: "Error during database saving" })
    }
    res.status(201).json(users)
})

server.get('/api/users', (req, res) => {
    if (!users) {
        return res.status(500).json({ errorMessage: "users cannot be retrieved" })
    }
    res.status(200).json(users);
})

server.get('/api/users/:id', (req, res) => {
    users.findUser(req.params.id)
    .then(response => {
        if (response) {
            return res.status(200).json([response])
        }
        return res.status(404).json({ errorMessage: "User not found" })
    })
    .catch(err => {
        return res.status(500).json({ errorMessage: err })
    })
})

server.delete('/api/users/:id', (req, res) => {
    const found = users.find(user => user.id === parseInt(req.params.id))
    if (found) {
        users = users.filter(user => user.id !== parseInt(req.params.id))
        return res.status(201).json(users);
    }
    res.status(404).json({ errorMessage: "User not found "})
})

server.put('/api/users/:id', (req, res) => {
    const found = users.findIndex(user => user.id === parseInt(req.params.id))
    if (found > -1) {
        for (const prop in req.body) {
            if (req.body[prop]) {
                users[found][prop] = req.body[prop]                
            }
        }
        return res.status(201).json(users[found])
    }
    res.status(404).json({ errorMessage: "User not found "})

})

server.patch('/api/users/:id', (req, res) => {
    const found = users.find(user => user.id === parseInt(req.params.id))
    if (found) {
        Object.assign(found, req.body)
        return res.status(201).json(found)
    }
    res.status(404).json({ errorMessage: "User not found "})
})

const PORT = 5000;

server.listen(PORT, () => {
    console.log('Listening to port ' + PORT);
})