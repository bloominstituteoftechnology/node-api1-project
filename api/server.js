// BUILD YOUR SERVER HERE

const express = require("express");
const generate = require("shortid").generate;
const rateLimit = require("express-rate-limit");
const Users = require("./users/model");
// INSTANCE OF EXPRESS APP
const server = express();
// GLOBAL MIDDLEWARE
server.use(express.json());
// console.log("node just run me me me");

// API LIMITER
const apiRequestLimiter = rateLimit({
  windowMs: 1 * 60 * 1000, // 1 minute
  max: 3, // limit each IP to 3 requests per windowMs
  message: "Your limit exceeded, too many requests, please come back later",
});
server.use(apiRequestLimiter);

// GET
server.get((req, res) => {
  res.status("new status");
});

server.get("/users", (req, res) => {
  res.status(200).json(users);
});

server.get("/users/:id", (req, res) => {
  const idVar = req.params.id;
  //   res.json(idVar);
  const emp = users.find((users) => users.id === idVar);
  if (!emp) {
    res.status(404).json({ message: `ID: ${idVar} does not exist` });
  } else {
    res.status(200).json(emp);
  }
});

// POST
server.post("/users", (req, res) => {
  const { name, bio } = req.body;
  if (!name || !bio) {
    res.status(400).json({ message: "Name and bio are required" });
  } else {
    const newHero = { id: generate().name, bio };
    heroes.push(newHero);
    res.status(201).json(newHero);
  }
  console.log(name, bio);
});

// PUT
server.put("/users", (req, res) => {
  const id = req.params.id;
  const { name, bio } = req.body;
  const indexOfHero = heroes.findIndex((heroes) => heroes.id === id);
  try {
    if (indexOfHero != -1) {
      heroes[indexOfHero] = { idVar, name, bio };
      res.status(200).json({ id, name, bio });
    } else {
      res.status(404).jdon({ message: `no heroes with id: ${id}` });
    }
  } catch (e) {
    res.status(500).json({ message: `Server error ${e}` });
  }
});

// DELETE
server.delete("/users/:id", (req, res) => {
  const idVar = req.params.id;
  try {
    throw "ERROR ERROR ERROR";
    if (!users.find((users) => users.id === idVar)) {
      res.status(404).json({ message: ` Heroes with id: ${idVar} not found` });
    } else {
      heroes = users.filter((users) => users.id !== idvar);
      res.status(200).json({ message: `Hero:: ${idVar} was deleted` });
    }
  } catch (e) {
    res.status(500).json({ message: `Server error: ${e}` });
  }
});

// 404 always in the last place
//------------------------------
server.use("*", (req, res) => {
  res.status(404).json({ message: "404 Not found )*:" });
});

module.exports = server; // EXPORT YOUR SERVER instead of {}
