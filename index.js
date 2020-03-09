

const express = require("express");
const shortid = require("shortid");

const server = express();

const PORT = 5000;
server.listen(PORT, () => 
console.log(`\n ** API on http://localhost:${PORT} **\n`));

let users = [{
    id: "",
    name: "",
    bio: ""
}];

server.use(express.json());


server.post("/api/users", (req, res) => {
    const userInfo = req.body
    userInfo.id = shortid.generate();
    const pushOut = () => users.push(userInfo.id, userInfo.name);
    if(!userInfo.name|| !userInfo.bio){
        res.status(400).json({errorMessage: "Please provide name and bio for the user."})
       
    }
    else if(!userInfo.name == res.name || !userInfo.bio == res.bio){
        res.status(500).json({ errorMessage: "The users information could not be retrieved." })
    }
    else {
        pushOut();
        res.status(201).json(users)
        
    }
    

})

server.get('/api/users', (req, res) => {

    if(!userInfo){
        res.status(500).json({ errorMessage: "The users information could not be retrieved." })
    }
    else {
        res.status(200).json({ errorMessage: "GET SUCCESS!"})
    }

})

server.get('/api/users/:id', (req, res) => {

})

server.delete('/api/users/:id', (req, res) => {

})

server.put('/api/users/:id', (req, res) => {

})
