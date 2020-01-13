// implement your API here

const express = require("express");
const cors = require("cors");

const { findById, find, add, remove, update } = require("./data/db");

const app = express();

app.use(express.json());

app.use(cors());

app.get("/api/users", (req, res) => {
  find()
    .then(data => {
      res.status(200).json(data);
    })
    .catch(error => {
      res.status(500).json({
        message: error.message,
        stack: error.stack
      });
    });
});

app.listen(8000, () => {
  console.log("listening on 8000");
});
