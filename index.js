

const express = require("express");
const shortid = require("shortid");

const server = express();

const PORT = 5000;
server.listen(PORT, () => 
console.log(`\n ** API on http://localhost:${PORT} **\n`));

// let users = [{
//     id: "",
//     name: "",
//     bio: ""
// }];

let users = [
    {
        id: 1,
        name: "Gary",
        bio: "I'm awesome"

    },
    {
        id: 2,
        name: "Steve",
        bio: "No, I'm Awesome!"
    }
]

server.use(express.json());


server.post("/api/users", (req, res) => {
    const userInfo = req.body
    userInfo.id = shortid.generate();
    const pushOut = () => users.push(userInfo.id, userInfo.name);

    if(!userInfo.name|| !userInfo.bio){
        res.status(400).json({errorMessage: "Please provide name and bio for the user."})
       
    }

    else {
        pushOut();
        res.status(201).json(users)
        
    }
    

})

server.get('/api/users', (req, res) => {
    const userObj = req;
    if(userObj)
        res.status(200).json({users, message: "Success"})
})

// use a .find() to catch the specific user
server.get('/api/users/:id', (req, res) => {

    const userId = req.params.id;
    console.log(userId);
    

    if(!users.find( users => users.id == userId )){
        res.status(404).json({errorMessage: "User not found."})
    }
    else {
        res.status(200).json(users.filter(users => 
            { return ( userId == users.id)}
        ))
    }

})

server.delete('/api/users/:id', (req, res) => {

    const userId = req.params.id;
    const found = () => users.id == userId;
    const updateUsers = (users) => {
        users = tempUser => {
            users.filter(users => {return (users.id != userId)})
        }
    }
    if(!found){
        res.status(404).json({errorMessage: "User not found."})
    }
    
    else {
        updateUsers();
        res.status(204).json({
            message: "Delete Success"
        })
    }

})

server.put('/api/users/:id', (req, res) => {

})
