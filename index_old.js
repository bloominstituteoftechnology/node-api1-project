console.log("\n === index.js executed!! ===\n")
const express = require("express");
const shortid = require("shortid");
const server = express();
const port = 5000;
server.listen(port, () => console.log(`\n== api on port ${port} ==\n`));

let users = [
    {
        id: 1,
        name: "Jane Doe",
        bio: "Not Tarzan's Wife, another Jane",
    },
];

// middleware
server.use(express.json());

// endpoints

// GET
server.get("/", (req, res) => {
    res.json({api: "running...!"});
    res.send('welcome');
});

server.get("/api/users", (req, res) => {
    res.json(users);
    if (!users) {
        res.status(500).json({errorMessage: "The users information could not be retrieved."});
    } else {
        res.status(200).json();
    }
});

server.get("/api/users/:id", (req, res) => {
    const id = req.params.id;
    const user = users.find((user) => user.id == id);

    if (user) {
        res.status(200).json(user);
    } else {
        res.status(404).json({ message: "The user with the specified ID does not exist." })
    }
});

// POST
server.post("/api/users", (req, res) => {
    const userInfo = req.body;
    users.push(userInfo);
    // res.status(201).json(users);
    
    if (!userInfo.name || !userInfo.bio) {
        res
        .status(400)
        .json({error: "Please Provide NAME and BIO for user"})
    } else if (userInfo.name && userInfo.bio) {
        userInfo.id = shortid.generate();
        users.push(userInfo);
        res.status(201).json(userInfo);
    } else {
        res.status(500).json({error:"ERROR cannot save user to DATABASE"})
    }
});

// DELETE

server.delete('/api/users/:id', (req, res) => {
    const {id} = req.params; //destructuring is prettier.
    const deletes = users.find(user => user.id === id);

    if (deletes) {
        users = users.filter(user => user.id !== id);
        res.status(200).json(deletes)
    }
    else if (!deletes) {
        users = users.filter(user => user.id !== id);
        res.status(404).json({message: "The user with the specified ID does not exist."});
    }
    else {
        res.status(500).json({message: 'The user could not be removed'});
    }
})

// PATCH
//https://stackoverflow.com/questions/47944257/how-to-get-the-request-payload-from-a-patch-request-in-express
server.patch('/api/users/:id', (req, res) => {
    const {id} = req.params;
    const patching = req.body;

    let sorted = users.find(user => user.id == id);

    if (sorted) {
        Object.assign(sorted, patching);
        res.status(200).json(sorted);
    } else if (!sorted) {
        res.status(404).json({message: 'USER ID does not exist'});
    } else if (!patching) {
        res.status(400).json({error: "Please Provide NAME and BIO for user"});
    }
    else {
        res.status(500).json({message: 'USER cannot be modified'});
    }

})


