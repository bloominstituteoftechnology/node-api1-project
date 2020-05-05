const express = require('express');
var shortid = require('shortid');

const server = express();
server.use(express.json());

let users = [

    {
        id: shortid.generate(),
        name: "Jane Doe", 
        bio: "Not Tarzan's Wife, another Jane"
    },

    {
        id: shortid.generate(),
        name: "Mohamed Gomri", 
        bio: "The man with the plan"
    },

    {
        id: shortid.generate(),
        name: "William Wallace", 
        bio: "Freedom!"
    },

      

      
];

let userId = shortid.generate();

//Root
server.get('/', (req, res) => {
    res.json('Node api-1 Project');
});

//Post
server.post('/api/users', (req, res) => {
    const { name, bio } = req.body;
    const newUser = { name, bio, id: userId };
    users.push(newUser);
    res.status(201).json(users);
});
  
//Get users
server.get('/api/users', (req, res) => {
    res.json(users)
});

//Get user by id.
server.get('/api/users/:id', (req, res) => {
    const { id } = req.params;
    const foundUser = users.find(us => us.id == id);
    if(foundUser){
        res.json(foundUser)
    }else {
        console.log('No shuch a user exists');
    }
});

//Delete a particular user.
server.delete('/api/users/:id', (req, res) => {
    const { id } = req.params;
    const foundUser = users.find(us => us.id == id);
    if(foundUser){
        users = users.filter(us => us.id !== id);
        res.status(200).json(users);
    }else {
        console.log('You can\'t delete a non existing user');
    }
});



//Patch

server.patch('/api/users/:id', (req, res) => {
    const { id } = req.params;
    let targetUser = users.find(us => us.id ===id);
    // const targetUserIndex = users.findIndex(us => us.id === id);

    // if (!id)
    //   res.status(400).json("Your request is missing the user id");

    // if (!req.body.name || !req.body.bio) {
    // res
    //     .status(422)
    //     .json("Make sure your request body has all the fields it needs");
    // }
    console.log("before: ", targetUser);
    let updatedUser = {
        ...req.body,
        id: targetUser.id
    }

    targetUser = updatedUser;
    
    console.log("after: ", targetUser)
    
    

    res.status(200).json(users);
  });



server.listen(5000, () => console.log('API running on port 5000'));