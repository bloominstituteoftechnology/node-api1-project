const express = require('express');
const shortid = require('shortid');
const bodyParser = require("body-parser");
const app = express();

const users = [];

app.use(bodyParser.json());

app.get("/api/users", (req, res)=>{
    res.status(200).json(users);
});

app.post("/api/users", (req, res)=>{
    const {name, bio} = req.body;

    if(!name || !bio) {
        res.status(400).json({errorMessage: "Please provide name and bio for the user."});
    }

    const newUser = {
        id: shortid.generate(),
        name: name,
        bio: bio
    };
    users.push(newUser);
    res.status(201).json(newUser);
})

app.listen(5000, ()=> console.log("App is running on port 5000"));