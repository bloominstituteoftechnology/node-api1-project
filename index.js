const express = require('express');
const shortid = require('shortid');
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
const path = require("path");
require("dotenv").config();

const users = [{id: "1", name:"bob", bio: "Hi, I'm bob."}];

app.use(express.static(__dirname));
app.use(express.static(path.join(__dirname, 'client/build')))

app.use(cors());
app.use(bodyParser.json());

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'client/build', 'index.html'))
});

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
});

app.get("/api/users/:id", (req, res)=>{
    const {id: userId} = req.params;
    const user = users.find(user=> user.id === userId);
    
    if(!user){
        res.status(404).json({message: "The user with the specified ID does not exist."});
    }
    res.status(200).json(user);
});

app.delete("/api/users/:id", (req, res)=>{
    const {id: userId} = req.params;
    const user = users.find(user=> user.id === userId);

    if(!user){
        res.status(404).json({message: "The user with the specified ID does not exist."});
    }
    users.splice(users.indexOf(user), 1);
    res.status(200).json(user);
});

app.put("/api/users/:id", (req, res)=>{
    const {id: userId} = req.params;
    let user = users.find(user=> user.id === userId);
    const {name, bio} = req.body;

    if(!user){
        res.status(404).json({message: "The user with the specified ID does not exist."});
    }
    if(!name || !bio){
        res.status(400).json({errorMessage: "Please provide name and bio for the user.s"})
    }

    const newUser = {
        ...user,
        name: name,
        bio: bio
    }
    users.splice(users.indexOf(user), 1, newUser);
    res.status(200).json(newUser);
});

app.listen(process.env.PORT, ()=> console.log(`App is running on port ${process.env.PORT}`));