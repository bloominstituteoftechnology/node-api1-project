// BUILD YOUR SERVER HERE
const express = require('express');
const User = require('./users/model');

const server = express();


server.post("/api/users", async (req, res) => {
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

module.exports = server; // EXPORT YOUR SERVER instead of {}
