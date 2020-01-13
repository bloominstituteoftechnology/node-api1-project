// implement your API here// install express and cors (npm packages)
// STEP 1: flesh out a dummy server
// STEP 2: flesh out the five endpoints (will use those helpers)
// imports
const express = require("express");
const cors = require("cors");

const { find, findById, insert, update, remove } = require("./data/db");

// instantiate an express app
const app = express();
// plug extra functionality to our app
// we need to be able to read req.body
app.use(express.json());
// we need to enable CORS so this server works for all origins
app.use(cors());

app.get("/users", (req, res) => {
  // Get all users, we do not need any extra information such as id.
  find()
    .then(users => {
      res.status(200).json(users);
    })
    .catch(error => {
      res.status(500).json({
        message: error.message,
        stack: error.stack
      });
    });
});
// we need code to spin up the server and just have it listen for incoming
app.listen(3000, () => {
    console.log('listening on 3000');
  })