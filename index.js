// import express from 'express'; // ES2015 modules
const express = require("express"); //CommonJS Modules // <<<<<<<<npm i express

const server = express();

server.use(express.json()); // needed for POST & PUT/PATCH

server.get("/", (req, res) => {
  res.json({ hello: "Web 26" });
});

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

// // add a hub
// server.post("/api/hubs", (req, res) => {
//   // axios.post(url, data, options); the data will be in body of the request

//   console.log(body, req);

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

const port = 5001;
server.listen(port, () => console.log(`n** API on port ${port} \n`));
