const express = require('express')
const server = express()
const { v4: uuidv4 } = require('uuid');
server.use(express.json());

let users = [
    {
        id: uuidv4(),
        name: "Jane Doe",
        bio: "Not Tarzan's Wife, another Jane",
    },
    {
        id: uuidv4(),
        name: "Danny Phantom",
        bio: "He's a phantom"
    },
    {
        id: uuidv4(),
        name: "Stone cold Steve Austin",
        bio: "ohhh yeaaah",
    }
]

server.get('/', (req,res)=>{
    res.json({api:'up and running'})
})

server.get('/api/users', (req,res)=>{
    res.json(users)
})

server.get('/api/users/:id', (req,res)=>{
    const reqId = req.params.id
    const reqUser = users.filter(user=>user.id === reqId)
    if(reqUser.length === 0){
        res.status(400).json({error: "there is no user with that id"});
    }
    else{
    res.status(200).json(reqUser[0]);
    }
})

server.post("/api/users", function (req, res) {
    const newUser = { 
                        id: uuidv4(),
                        ...req.body
                    };
    if(newUser === undefined){
        res.status(400).json({error: "please provide valid data"});
    }
    else if(newUser.name === undefined){
        res.status(400).json({error: "missing name"});
    }
    else if(newUser.bio === undefined){
        res.status(400).json({error: "missing bio"});
    }
    else{
        users.push(newUser);
  
        res.status(201).json(newUser);  
    }
    
});

server.delete("/api/users/:id", function (req, res) {
    const id = req.params.id;
  
    
    const updatedUsers = users.filter(user => user.id !== id);

    if(updatedUsers.length === users.length){
        res.status(400).json({error: "there is no user with that id"});
    }
    else if(updatedUsers.length === (users.length - 1)){ 
    users = users.filter(user => user.id !== id);
    res.status(200).json(users);
    }
  });

  server.delete("/api/users/:id", (req, res)=> {
    const id = req.params.id;
    const updatedUser = req.body
    const userIndex = users.findIndex(user=>user.id === id)

    if(userIndex === undefined){
        res.status(400).json({error: "there is no user with that id"});
    }
    else if(updatedUser.name === undefined){
        res.status(400).json({error: "missing name"});
    }
    else if(updatedUser.bio === undefined){
        res.status(400).json({error: "missing bio"});
    }
    else{
        users[userIndex] = updatedUser
        res.status(200).json(users[userIndex]);
    }
    
  });

server.listen(8000, ()=> console.log('server is up'))

