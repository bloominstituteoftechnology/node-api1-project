



// used port 5000 instead of 8000

const express = require("express");
const hubs = require("./data/db.js");
const server = express();
server.use(express.json());


server.get("/", (req, res) => {
  res.send("This code is working just fine!");
});

server.get("/api/users", (req, res) => {
  hubs
    .find()
    .then(users => {
      res.send(users);
    })
    .catch(err => {
      res.status(550).json({error: "That user was not found."});
    });
});

server.get("/api/users/:id", (req, res) => {
  const id = req.params.id;
  hubs
    .findById(id)
    .then(user => {
      if (!user) {
        res
          .status(404)
          .json({error: "That user ID doesn't exist on this server."});
      } else {
        res.json(user);
      }
    })
    .catch(error => {
      res.status(400).json({error: "The users description is not available."});
    });
});

server.post("/api/users", (req, res) => {
    const userDesc = req.body;
    if (!userDesc.name || !userDesc.bio) {
      res
        .status(400)
        .json({error: "Enter a name and bio for this user." });
    } else {
      hubs
        .insert(userDesc)
        .then(user => {
          res.status(201).json(user);
        })
        .catch(err => {
          res.json({error: "The user was not added!" });
        });
    }
  });
  
  server.delete("/api/users/:id", (req, res) => {
    const id = req.params.id;
    hubs.findById(id)
    .then(user => {
      if (!user) {
        res
          .status(404)
          .json({error: "That user ID doesn't exist on this server."});
      } else {
        hubs
          .remove(id)
          .then(hub => {
            res.status(201).json(hub);
          })
          .catch(error => {
            res.status(500).json({error: "There was an error deleting the user."});
          });
      }
    });
  });

  server.put("/api/users/:id", (req, res) => {
    const id = req.params.id;
    const modify = req.body;
    hubs.findById(id).then(user => {
      if (!user) {
        res
          .status(404)
          .json({ message: "That user ID doesn't exist on this server."});
      } else if (!modify.name || !modify.bio) {
        res
          .status(400)
          .json({ error: "Please enter a user name and bio."});
      } else {
        hubs
          .update(id, modify)
          .then(hub => {
            res.status(200).json(hub);
          })
          .catch(error => {
            res.status(500).json({ message: "That user was not modified!"});
          });
      }
    });
  });
const port = 5000;
server.listen(port, () => console.log("Your server is running on port 5000."));

