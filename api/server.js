// BUILD YOUR SERVER HERE
const express = require('express');
const User = require('./users/model');
const bodyParser = require('body-parser');


const server = express();

server.use(express.json());


// POST a User
server.post("/api/users/", async (req, res) => {
    const user = req.body;

    if( !user.name || !user.bio ) {
        res.status(400).json({ message: "Please provide name and bio for the user"});
    } else {

        try {
            const newUser = await User.insert(user);
            res.status(201).json(newUser);
        } catch (err) {
            console.error({error: err});
            res.status(500).json({ message: "There was an error while saving the user to the database" });
        };
    };
});


//GET all Users
server.get('/', async (req, res) => {
    try {
        const users = await User.find();
        res.json(users);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "The users information could not be retrieved" });
    };
});


//GET User by id
server.get(`/api/users/:id`, async (req, res) => {
    const {id} = req.params;

    try {
        const user = await  User.findById();
        res.json(user);
    } catch (err) {
        console.error(err);
        res.status(404).json({ message: "The user with the specified ID does not exist" });
    };
});




module.exports = server; // EXPORT YOUR SERVER instead of {}
