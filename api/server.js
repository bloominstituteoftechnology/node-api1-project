// Server Template
// IMPORTS AT THE TOP
const express = require("express");
const Data = require("./users/model");
//const {findAll, findById, update} = require("./dog-model.js")

// INSTANCE OF EXPRESS APP
const server = express();

// GLOBAL MIDDLEWARE
server.use(express.json());

//Sanity Check [GET] / (Hello World endpoint)
//move a copy to the end and change to 404 message after use as sanity checker
// server.use("*", (req, res) => {
//   console.log(Data);
//   res.status(200).json({ message: "SERVER OPERATIONAL code: 200" });
// });

// ENDPOINTS
// [GET] /api/data/:id (R of CRUD, fetch data by :id)

server.get("/api/users/:id", (req, res) => {
  const userId = req.params.id;
  Data.findById(userId)
    .then((user) => {
      if (!user) {
        res.status(404).json("User Does Not Exist");
      } else {
        res.json(user);
      }
    })
    .catch((err) => {
      res.status(500).json({ message: err.message });
    });
});

// [GET] /api/data (R of CRUD, find() from line line: 17 model.js)

server.get("/api/users", (req, res) => {
  Data.find()
    .then((users) => {
      console.log("Users data found and resolved GET CALL: ", users);
      res.status(200).json(users);
    })
    .catch((err) => {
      res.status(500).json({ message: err.message });
    });
});

// [POST] /api/data (C of CRUD, create new data from JSON payload)
server.post("/api/users", (req, res) => {
  //sanity checker
  //const newUser = { name: "tony", bio: "artist" }; //happy path 200 returned
  const newUser = req.body //test passes 400 out proper key value sets
  if (!newUser.name || !newUser.bio) {
    res
      .status(400)
      .json({ message: "Please provide name and bio for the user" });
  } else {
    Data.insert(newUser)
      .then((user) => {
        console.log(user);
        res.status(201).json(user);
      })
      .catch((err) => {
        res
          .status(500)
          .json({
            message: "There was an error while saving the user to the database",
          });
          console.log("Error posting new user from the server", err)
      });
  }
});
// [PUT] /api/data/:id (U of CRUD, update data with :id using JSON payload)
server.put("/api/users/:id", async (req, res) => {
  //const { id } = req.params; //happy path 200
  const { id } = req.body
  //const changes = req.body;
  const changes = { name: "tony", bio: "artist" }; //happy path 200 returned
  try {
    if (!changes.name || !changes.bio) {
      res
        .status(400)
        .json({ message: "Please provide name and bio for the user" });
    } else {
      const updatedUser = await Data.update(id, changes);
      if (!updatedUser) {
        res
          .status(404)
          .json({ message: "The user with the specified ID does not exist" });
      } else {
        res.status(200).json(updatedUser);
      }
    }
    const updatedUser = await Data.update(id, changes);
    res.status(200).json(updatedUser);
  } catch (err) {
    res
      .status(500)
      .json({ message: "The user information could not be modified" });
  }
});

// [DELETE] /api/data/:id (D of CRUD, remove data with :id)
server.delete("/api/users/:id", async (req, res) => {
    try{
        const {id} = req.params
        const deletedUser = await Data.remove(id)
        if (!deletedUser) {
            res.status(404).json({ message: "The user with the specified ID does not exist" })
        }
    }catch(err) {
            console.log("Error deleting user from the server 500", err)
            res.status(500).json({ message: "The user could not be removed" })
        }
    
})

// [GET] / (Hello World endpoint 404 default)
server.use("*", (req, res) => {
  console.log(Data);
  res.status(404).json({ message: "Uh oh! You've found the void!" });
});

//expose server to global state 
module.exports = server;
