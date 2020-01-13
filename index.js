// implement your API here
const express = require("express");

const server = express();

const Data = require("./data/db.js");

server.use(express.json());

server.get("/", (req, res) => {
    res.send("Server Running!");
  });

// gets a array of all the users in the database
server.get("/api/users", (req, res) => {
    Data.find() // this is a promise, so just like axios it takes a .then and a .catch
    .then(data => {
      res.status(200).json(data);
    })
    .catch(error => {
      console.log(error);
      response.status(500).json({
        errorMessage: "The users information could not be retrieved"
      });
    });
});

const port = 7000;
server.listen(port, () => console.log(`server listening on port ${port}`));
