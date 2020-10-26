console.log("AWESOME Webbbbb 35!");

// import express from 'express'

const express = require("express");
const { restart } = require("nodemon");
const shortid = require("shortid");
//import {generate} from 'shortid// ES6 Modules
const generate = require("shortid").generate;

//2Instantiate and configre the server

const app = express(); //here is our server
app.use(express.json());

// 3- Decide a Port nUmber
const PORT = 4000;

//4- Fake Data

const users = [
  {
    id: generate(), // hint: use the shortid npm package to generate it
    name: "Jane Doe", // String, required
    bio: "Not Tarzan's Wife, another Jane", // String, required
  },
  {
    id: generate(),
    name: "John Doe", // String, required
    bio: "Not Jane's Husband, her Brother", // String, required
  },
];

//5 create endpoints

//GET ENDPOINT
app.get("/users", (req, res) => {
    res.status(200).json(users)
})

//Get by UserID
app.get("/users/:id", (req, res) =>{
    const {id} = req.params
    const user = users.find((user) => user.id ===id)
    if (!user) { 
        res.status(404).json({ message: `The user with id ${id} cannot be found`})
    } else{
        res.status(200).json(user)
    }
})


//POST new user

app.post("/users", (req, res) =>{
 const { name, bio } = req.body
 if (!name || !bio){
     res.status(400).json({ message: "Name and Bio required"})
 } else {
     const newUser = { id: generate(), name, bio}
     users.push(newUser)
     res.status(201).json(newUser)
 }
})


// PUT USER
app.put("/users/:id", (req, res) =>{
    const {id } = req.params
    const{ name, bio} = req.body
    const indexOfUser = users.findIndex((user) => user.id === id)

    if (indexOfUser !== -1){
        user[indexOfUser] = { id, name, bio}
    }
})



//For all other errors
app.get("*", (req, res) => {
    res.status(404).json({ message: "Not Found!" });
  });






// 6 LISTEN FOR INCOMMING REQUESTS
app.listen(PORT, () => {
    console.log(`listening on port ${PORT}`)
})