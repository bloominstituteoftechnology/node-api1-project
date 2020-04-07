const express = require('express');
const shortid = require('shortid')

const server = express();

const port = 5000;
server.listen(port, () => console.log(`\n== api on port ${port} ==\n`))

let users =[ 
    {
        id: "",
        name: "Janice",
        bio: " not Chandler's girlfriend"
    }
];

//middleware
server.use(express.json());


//endpoints

server.get("/api/users", (req, res) => {   
    res.status(200).json(users);
});

server.get(`/api/users/:id`, (req, res) => {
    const userid = req.params;
    const foundUser = users.find(user => user.id == {userid})
    res.status(201).json(foundUser)
});

server.post('/api/users', (req, res) =>{
    const userAdd = req.body;

    userAdd.id = shortid.generate();
    users.push(userAdd);
    
    res.status(201).json(users);

})



console.log (`\n === Testing ===\n`)