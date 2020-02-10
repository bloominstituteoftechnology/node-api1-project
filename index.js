// implement your API here
const express = require("express");

const Database = require("./data/db.js");

const server = express();

server.use(express.json());

//POST requests
server.post("/api/users", (req, res) => {
  const dataInfo = req.body;
  console.log("body", req.body);

  Database.insert(dataInfo)
    .then(user => {
      if (!dataInfo.name || !dataInfo.bio) {
        res
          .status(400)
          .json({ errorMessage: "Please provide name and bio for the user." });
      } else {
        res.status(201).json(user);
      }
    })
    .catch(err => {
      console.log(err);

      res.status(500).json({
        errorMessage:
          "There was an error while saving the user to the database."
      });
    });
});

//GET requests
server.get("/api/users", (req, res) => {
  Database.find()
    .then(users => {
      res.status(200).json(users);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        errorMessage: "The users information could not be retrieved."
      });
    });
});

server.get("/api/users/:id", (req, res) => {
  Database.findById(req.params.id)
    .then(user => {
      if (!user) {
        res.status(404).json({
          errorMessage: "The user with the specified ID does not exist."
        });
      } else {
        res.status(200).json(user);
      }
    })
    .catch(err => {
      console.log(err);
      res
        .status(500)
        .json({ errorMessage: "The user information could not be retrieved." });
    });
});

//DELETE requests
server.delete("/api/users/:id", (req, res) => {
  Database.remove(req.params.id)
    .then(removed => {
      if (!removed) {
        res.status(404).json({
          errorMessage: "The user with the specified ID does not exist."
        });
      } else {
        res.status(200).json(removed);
      }
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ errorMessage: "The user could no be removed." });
    });
});

//PUT requests
server.put("/api/users/:id", (req, res) => {
  const { id } = req.params;
  const { name, bio } = req.body;

  if (!name || !bio) {
    res
      .status(400)
      .json({ errorMessage: "Please provide name and bio for the user." });
  } else {
    Database.update(id, req.body)
      .then(user => {
        if (!user) {
          res.status(404).json({
            errorMessage: "The user with the specified ID does not exist."
          });
        } else {
          res.status(200).json(user);
        }
      })
      .catch(err => {
        console.log(err);
        res.status(500).json({
          errorMessage: "The user information could not be modified."
        });
      });
  }

  // Database.update(req.params.id, req.body.name, req.body.bio)
  //   .then(updated => {
  //     if (!updated) {
  //       res.status(404).json({
  //         errorMessage: "The user with the specified ID does not exist."
  //       });
  //     } else if (!req.body.name || !req.body.bio) {
  //       res
  //         .status(400)
  //         .json({ errorMessage: "Please provide name and bio for the user." });
  //     } else {
  //       res.status(200).json(updated);
  //     }
  //   })
  //   .catch(err => {
  //     console.log(err);
  //     res.status(500).json({
  //       errorMessage: "The user information could not be modified."
  //     });
  //   });
});

const port = 5000;
server.listen(port, () => console.log(`\n** API on port ${port} \n`));
