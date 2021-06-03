// BUILD YOUR SERVER HERE
const express = require("express");
const User = require("./api/users/model.js")
//const { destructured methods } = require("./model");

//instance of server
const server = express();

//instance of global middleware
server.use(express.json());

//ENDPOINTS
//SCHEMA
// {
//     id: "a_unique_id", // String, required
//     name: "Jane Doe",  // String, required
//     bio: "Having fun", // String, required
//   }

// [POST] /api/users (Create of CRUD, create a user)
server.post("/api/dogs", (req,res)=>{
    const newDog = req.body
    if(!newDog.name || !newDog.weight){
        res.status(422).json("Need name and weight")
    }else{
        Dog.create(newDog)
        .then(dog=>{
            res.status(201).json(dog)
        })
        .catch(err=>{
            res.status(500).json({message:err.message})
        })
    }    
})

server.post("/api/model", (req,res)=>{
    const newUser = req.body
    if(!newUser.name || !newUser.bio){
        res.status(400).json("Please provide name and bio for the user")
    }else{
        User.create(newUser) //saves the new user the the database.
        .then(user=>{
            res.status(201).json({user})
        })
        .catch(err=>{
            res.status(500).json({message: "There was an error while saving the user to the database"})
        })
    }
}

//| GET    | /api/users     | Recieve of CRUD - Returns an array users.

//| GET    | /api/users/:id | Returns the user object with the specified `id`.  

//| DELETE | /api/users/:id | Removes the user with the specified `id` and returns the deleted user.  

//| PUT    | /api/users/:id | Updates the user with the specified `id` using data from the `request body`. Returns the modified user |







module.exports = {}; // EXPORT YOUR SERVER instead of {}
