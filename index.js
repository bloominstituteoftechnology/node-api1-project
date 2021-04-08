// const server = require('./api/server');

// const port = 5000;

// // START YOUR SERVER HERE
// server.listen(5000, () => {
//     console.log("server started at localhost:5000")
// })

const express = require('express');
const db = require("./database");
// creates an express application using the express module
const server = express();

server.use(express.json())

// configures our server to execute a function for every GET request to "/"
// the second argument passed to the .get() method is the "Route Handler Function"
// the route handler function will run on every GET request to "/"
server.get('/api', (req, res) => {
    // express will pass the request and response objects to this function
    // the .send() on the response object can be used to send a response to the client
    res.send('Hello World');
});

server.get('/api/users', (req, res) => {
    // express will pass the request and response objects to this function
    // the .send() on the response object can be used to send a response to the client
    const users = db.getUsers()
    res.json(users)
});

server.get("/api/users/:id", (req, res) => {
    const user = db.getUserById(req.params.id)

    if (user) {
        res.json(user)
    } else {
        res.status(404).json({
            message: "The user with the specified ID does not exist",
        })
    }
})

server.post("/api/users", (req, res) => {
    if (!req.body.name) {
        return res.status(400).json({ message: "Please provide name for the user" })
    }

    const newUser = db.createUser({
        name: req.body.name,
    })

    res.json(newUser)
})

server.put("/api/users/:id", (req, res) => {
    const user = db.getUserById(req.params.id)

    if (user) {
        const updatedUser = db.updateUser(user.id, {
            // use a fallback value so we don't accidentally set it to empty
            name: req.body.name || user.name,
        })

        res.json(updatedUser)
    } else {
        res.status(404).json({
            message: "The user with the specified ID does not exist",
        })
    }
})

server.delete("/api/users/:id", (req, res) => {
    const user = db.getUserById(req.params.id)

    if (user) {
        db.deleteUser(user.id)

        // a successful but empty response
        res.status(204).end()
    } else {
        res.status(404).json({
            message: "The user with the specified ID does not exist",
        })
    }
})

// once the server is fully configured we can have it "listen" for connections on a particular "port"
// the callback function passed as the second argument will run once when the server starts
server.listen(8000, () => console.log('API running on port 8000'));