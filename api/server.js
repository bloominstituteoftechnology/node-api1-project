// BUILD YOUR SERVER HERE
const express = require('express');
const User = require('./users/model');

const server = express();

server.use(express.json());


// POST
server.post("http://localhost:5000/api/users ", async (req, res) => {
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


//GET
server.get('/', async (req, res) => {
    try {
        const users = await User.find();
        res.json(users);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "The users information could not be retrieved" });
    };
});




module.exports = server; // EXPORT YOUR SERVER instead of {}
