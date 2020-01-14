// implement your API here
const express = require("express");

const server = express();

const Data = require("./data/db.js");

server.use(express.json());

const cors = require("cors");

server.use(cors());

server.get("/", (req, res) => {
    res.send("Server Running!");
  });

// gets a array of all the users in the database
server.get("/api/users", (req, res) => {
    Data.find() // this is a promise, so just like axios it takes a .then and a .catch
    .then(data => {
      res.status(200).json(data);
    })
    .catch(err => {
      console.log(err);
      response.status(500).json({
        errorMessage: "The users information could not be retrieved"
      });
    });
});

// create a new user
server.post("/api/users", (req, res) => {
    const userData = req.body;
    Data.insert(userData) // passing in the request body
    .then(newUser => {
        res.status(201).json(newUser);
    })
    .catch(err => {
        console.log(err);
        res.status(400).json({
            errorMessage: "Please provide name and bio for the user"
        });
    });
});

// deletes a user
server.delete("/api/users/:id", (req, res) => {
    const id = req.params.id;
    // console.log(req.params)
    Data.remove(id)
    .then(deleted => {
        res.status(200).json(deleted);
    })
    .catch(err => {
        console.log(err);
        res.status(404).json({
            errorMessage: "The user with the specific ID does not exist"
        });
    });
});

// returns a user with a specific ID
server.get("/api/users/:id", (req, res) => {
    const ID = req.params.id
    Data.findById(ID)
    .then(specific => {
        res.status(200).json(specific);
    })
    .catch(err => {
        console.log(err);
        res.status(404).json({
            errorMessage: "The user with the specific ID does not exist"
        });
    });
});

// updates a user 
server.put("/api/users/:id", (req, res) => {
    const updateData = req.body
    const userId = req.params.id

    Data.update(userId, updateData)
    .then(update => {
        res.status(200).json(update);
    })
    .catch(err => {
        console.log(err);
        res.status(404).json({
            errorMessage: "The user with the specific ID does not exist"
        })
    })
    .catch(err => {
        console.log(err);
        res.status(400).json({
            errorMessage: "Please provide name and bio for the user"
        })
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({
            errorMessage: "The user information could not be modified"
        })
    })
})

const port = 7000;
server.listen(port, () => console.log(`server listening on port ${port}`));
