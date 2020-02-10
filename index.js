// import express from 'express'; // ES2015 modules
const express = require("express"); //CommonJS Modules // <<<<<<<<npm i express

const server = express();

const Db = require("./data/db");

server.use(express.json()); // needed for POST & PUT/PATCH

server.get("/", (req, res) => {
  res.json({ hello: "Web 26" });
});
server.post("/api/hubs", (req, res) => {
  const userData = req.body;
  Db.insert(userData)
    .then(user => {
      res.status(201).json(user);
    })
    .catch(error => {
      console.log(error);
      res.status(400).json({ errorMessage: "Name and bio required for user" });
    });
});

const port = 5001;
server.listen(port, () => console.log(`n** API on port ${port} \n`));

// add a hub
// axios.post(url, data, options); the data will be in body of the request

//   console.log(body, req);

// // view a list of hubs
// server.get("/api/hubs", (req, res) => {
//   //got and get the hubs from the DB
//   Hubs.find()
//     .then(hubs => {
//       res.status(200).json(hubs);
//     })
//     .catch(err => {
//       console.log(err);
//       res.status(500).json({ errorMessage: "oops" });
//     });
// });

//   const hubInfo = req.body;
//   // validate the data, and if the data is valid save it
//   Hubs.add(hubInfo)
//     .then(hub => {
//       res.status(201).json(hub);
//     })
//     .catch(err => {
//       console.log(err);
//       res.status(500).json({ errorMessage: "oops" });
//     });
// });
