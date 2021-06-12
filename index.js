const express = require("express");
const shortid = require("shortid");

//create an express server instance
const server = express();

//middleware
server.use(express.json());

let hubs = [
  {
    id: 1,
    name: "rigo",
    bio: "",
  },
];

server.get("/test", (req, res) => {
  res.json({ API: "server is running and working.." });
});

//C -- CREATE POST
//R - READ GET
//U - UPDATE PUT
//D - DELETE DELETE

// create
server.post("/api/hubs", (req, res) => {
  const newPost = req.body;
  newPost.id = shortid.generate();
  hubs.push(newPost);

  res.status(201).json(newPost);
});

// read
server.get("/api/hubs", (req, res) => {
  if (hubs) {
    res.status(200).json(hubs);
  } else {
    res
      .status(500)
      .json({ errorMessage: "the user is not found / could not be retrieved" });
  }
});

//read by ID
server.get("/api/hubs/:id", (req, res) => {
  const id = req.params.id;

  const found = hubs.find((item) => item.id === id);
  if (found) {
    // hubs = hubs.filter((item) => item.id !== id);
    res.status(200).json(found);
  } else {
    res.status(404).json({ message: "user with ID not found" });
  }
});

//delete
server.delete("/api/hubs/:id", (req, res) => {
  const id = req.params.id;

  const deleted = hubs.find((item) => item.id === id);
  if (deleted) {
    hubs = hubs.filter((item) => item.id !== id);
    res.status(200).json(deleted);
  } else {
    res.status(404).json({ message: "id not found" });
  }
});

//PATCH
server.patch("/api/hubs/:id", (req, res) => {
  //
  const { id } = req.params;
  const changes = req.body;

  let found = hubs.find((item) => item.id === id);
  if (found) {
    Object.assign(found, changes);
    res.status(200).json(found);
  } else {
    res.status(404).json({ message: "id not found" });
  }
});

//UPDATE
server.put("/api/hubs/:id", (req, res) => {
  const { id } = req.params;
  const changes = req.body;
  changes.id = id;

  let index = hubs.findIndex((item) => item.id === id);

  if (index !== -1) {
    hubs[index] = changes;
    res.status(200).json(hubs[index]);
  } else {
    res.status(404).json({ message: "id not found" });
  }
});

server.listen(8000, () => {
  console.log(`server is listening on port`, 8000);
});
