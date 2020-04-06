const express = require('express');
const server = express();
const shortid = require('shortid');
// console.log(shortid.generate());

// //array for testing only-comment out
// let users = [
//     {
//       id: "xldctPk71",
//       name: "Jane Doe",
//       bio: "Not Tarzan's wife, another Jane",
//     },
//     {
//       id: "CAh2Mq9c7",
//       name: "Griffin Wells",
//       bio: "The invisible man",
//     },
//   ];

// initalize users array
const users = [];

// middleware
server.use(express.json());

// users endpoints
server.get('/', (req,res)=> {
    res.status(200).json({message: 'users api is running...'});
});

server.post('/api/users', validatePost, (req,res)=>{
    const user = req.body;
    user.id = shortid.generate();
    users.push(user);
    res.status(201).json(user)
});

server.get('/api/users' , (req,res)=>{

    if(users){
       return res.status(200).json(users);
    }else{
        return res.status(500).json({errorMessage: "The users information could not be retrieved."});
    }
    
});

server.get('/api/users/:id', (req,res)=> {
    const reqUser = users.find(user => user.id == req.params.id)
    if(reqUser){
        return res.status(200).json(reqUser)
    }else{
        return res.status(404).json({message:  "The user with the specified ID does not exist."})
    }
});

//use next() js to validate 
function validatePost  (req, res , next){
    if(req.body.name == undefined || req.body.bio == undefined || req.body.bio === '' || req.body.name == ''){
         return res.status(404).json({message: "Please provide name and bio for the user."})
    }else{
        return next();
    }
}


const port = 5000;//run server on port 5000
server.listen(port, () => console.log(`\n***** api on port ${port} *****\n`));