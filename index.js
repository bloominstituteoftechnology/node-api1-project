const express = require("express");
const generate = require("shortid").generate;
const rateLimit = require("express-rate-limit");
const app = express();
app.use(express.json());

const PORT = 1234;

let heroes = [
  { id: generate(), name: "Ed Carter", bio: "hero" },
  { id: generate(), name: "Mary Edwards", bio: "super hero" },
];

const apiRequestLimiter = rateLimit({
  windowMs: 1 * 60 * 1000, // 1 minute
  max: 3, // limit each IP to 3 requests per windowMs
  message: "Your limit exceeded, too many requests, please come back later",
});
app.use(apiRequestLimiter);

console.log("node just run me me me");

// START YOUR SERVER HERE
app.get((req, res) => {
  res.status("new status");
});

app.get("/heroes", (req, res) => {
  res.status(200).json(heroes);
});

app.get("/heroes/:id", (req, res) => {
  const idVar = req.params.id;
  //   res.json(idVar);
  const emp = heroes.find((heroes) => heroes.id === idVar);
  if (!emp) {
    res.status(404).json({ message: `ID: ${idVar} does not exist` });
  } else {
    res.status(200).json(emp);
  }
});

app.post("/heroes", (req, res) => {
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

app.put("/heroes", (req, res) => {
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

app.delete("/heroes/:id", (req, res) => {
  const idVar = req.params.id;
  try {
    throw "ERROR ERROR ERROR";
    if (!heroes.find((heroes) => heroes.id === idVar)) {
      res.status(404).json({ message: ` Heroes with id: ${idVar} not found` });
    } else {
      heroes = heroes.filter((heroes) => heroes.id !== idvar);
      res.status(200).json({ message: `Hero:: ${idVar} was deleted` });
    }
  } catch (e) {
    res.status(500).json({ message: `Server error: ${e}` });
  }
});

// 404 always in the last place
//------------------------------
app.use("*", (req, res) => {
  res.status(404).json({ message: "404 Not found )*:" });
});

app.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`);
});
