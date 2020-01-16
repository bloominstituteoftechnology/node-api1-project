// implement your API here
const express = require("express");
const db = require("./data/db");

const server = express();
server.listen(4000, () => {
  console.log("**listening on Port 4000");
});

server.use(express.json());

server.get("/api/users", (req, res) => {
  db.find()
    .then(users => {
      res.status(200).json(users);
    })
    .catch(err => {
      res.status(500).json({ success: false, err });
    });
});

server.post("/api/users", (req, res) => {
  const userInfo = req.body;

  db.insert(userInfo)
    .then(user => {
      res.status(201).json({ success: true, user });
    })
    .catch(err => {
      res.status(500).json({ success: false, err });
    });
});

server.delete("/api/users/:id", (req, res) => {
  const { id } = req.params;

  db.remove(id)
    .then(deleted => {
      if (deleted) {
        res.status(204).end();
      } else {
        res.status(404).json({ success: false, message: "id not found" });
      }
    })
    .catch(err => {
      res.status(500).json({ success: false, err });
    });
});

server.put("/api/users/:id", (req, res) => {
  const { id } = req.params;
  const name = req.body.name;
  const bio = req.body.bio;
  const user = req.body;

  db.update(id, user)
    .then(updated => {
      if (updated) {
        console.log("UPDATED!", name, bio);
        if (!name || !bio) {
          res
            .status(400)
            .json({ success: false, message: "must have name and bio" });
        }
        res.status(200).json({ success: true, updated });
      } else {
        res.status(404).json({ success: false, message: "not found" });
      }
    })
    .catch(err => {
      res.status(500).json({ success: false, err });
    });
});

server.get("/api/users/:id", (req, res) => {
  const { id } = req.params;

  db.findById(id)
    .then(user => {
      if (user) {
        res.status(200).json({ success: true, user });
      } else {
        res.status(404).json({ success: false, message: "cant find ID" });
      }
    })
    .catch(err => {
      res.status(500).json({ success: false, err });
    });
});
