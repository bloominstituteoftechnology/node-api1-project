const express = require('express');
const shortid = require('shortid');//genrate unique id's
console.log(shortid.generate());

const server = express();

//array for testing only-comment out
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

//initalize users array
const users = [];

//middleware
server.use(express.json());

//endpoints
//testin api is operating
server.get('/', (req,res) => {
    res.json({api: "is running..."});
});


//GET - return users array
server.get("api/users", (res,req) => {
    res.status(200).json(users);
})


//POST

// server.post("/api/users", (req,res) => {
//     const {name, bio} = req.body


//     if (!name || !bio){
//         res.status(400).json({ errorMessage: "Please provide name and bio for the user." })
//         } else {

//     users.push(usersInfo);

//     res.status(201).json(users);
//         }
// });
//GET
// server.get("/api/users", (req, res) => {
  
//     if(!users){

//     }
    
// });



const port = 5000;//run server on port 5000
server.listen(port, () => console.log(`\n***** api on port ${port} *****\n`));