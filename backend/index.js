// implement your API here
const express = require("express");
const db = require("./data/db");
const cors = require("cors");

const server = express();

//global middleware section
server.use(express.json());
//cors
server.use(cors());

server.listen(4000, () => {
  console.log("listening on port 4000");
});

server.get("/", (req, res) => {
  res.send("hello wolrd!");
});

server.get("/now", (req, res) => {
  res.send(`response on now path ${new Date().toISOString()}`);
});

//get info from database
server.get("/users", (req, res) => {
  db.find()
    .then(users => {
      res.status(200).json(users);
    })
    .catch(err => {
      res.status(500).json({
        success: false,
        err
      });
    });
});

server.get("/users/:id", (req, res) => {
  const { id } = req.params;

  db.findById(id)
    .then(user => {
      res.status(200).json(user);
    })
    .catch(err => {
      res.status(500).json({
        success: false,
        err
      });
    });
});

//add to the database
server.post("/users", (req, res) => {
  const userInfo = req.body;
  db.insert(userInfo)
    .then(user =>
      res.status(201).json({
        success: true,
        user
      })
    )
    .catch(err => {
      res.status(500).json({
        success: false,
        err
      });
    });
});

//delete user from database
server.delete("/users/:id", (req, res) => {
  const { id } = req.params;

  db.remove(id)
    .then(deleted => {
      if (deleted) {
        res.status(204).end();
      } else {
        res.status(404).json({
          success: false,
          message: "id not found"
        });
      }
    })
    .catch(err => {
      res.status(500).json({
        success: false,
        err
      });
    });
});

server.put("/users/:id", (req, res) => {
  const { id } = req.params;
  const users = req.body;

  db.update(id, users)
    .then(updated => {
      if (updated) {
        res.status(200).json({
          success: true,
          updated
        });
      } else {
        res.status(404).json({
          success: false,
          message: "id not found"
        });
      }
    })
    .catch(err => {
      res.status(500).json({
        success: false,
        err
      });
    });
});
