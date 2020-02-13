
//imports 
const express = require("express");
let Users = require("./data/db");
//Server using express
const server = express();
//Express will read data as json
server.use(express.json());
server.get("/", (req,res) =>{
    res.json({working: "its working right"})
})
//all users listed
server.get("/api/users",(req,res)=>{
    Users.find().then(users=>{
        res.status(200).json(users);
    })
    .catch(err=>{
        console.log(err);
        res.status(500).json({errorMessage:"User list not found"})
    })
})
//getting users by id
server.get("/api/users/:id", (req,res)=>{
    const {id} = req.params;
    Users.findById(id).then(users=>{
        res.status(200).json(users);
    })
    .catch(err=>{
        console.log(err)
        res.status(500).json({errorMessage:"User not Found. Does not Exist"})
    })
})
//adding a user
server.post("/api/users",(req,res)=>{
   const newUserInfo = req.body;
   Users.insert(newUserInfo)
   .then(user=>{
       res.status(201).json({user, message: "created user"});
   })
   .catch(err=>{
       console.log(err);
       res.status(500).json({
           errorMessage:"Unable to create user. make sure right data is passing"
        })
   })
})
//Updating user information
server.put("/api/users/:id", (req,res)=>{
    const newUserInfo = req.body;
    const {id} = req.params;
    Users.update(id, newUserInfo)
    .then(edit=>{
        res.status(201).json(edit);
    })
    .catch(err=>{
        console.log(err);
        res.status(500).json({errorMessage:"Unable to edit user"})
    })
})
//Deleting a user
server.delete("api/users/:id", (req,res)=>{
    const {id} = req.params;
    Users.remove(id)
    .then(removed=>{
        res.status(200).json(removed);
    })
    .catch(err=>{
        console.log(err);
        res.status(500).json({errorMessage:"Unable to remove user"})
    })
})
const port = 8080;
server.listen(port,()=> console.log(`Server is running on port ${port}!`))// implement your API here
