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
app.get("*", (req, res) => {
  res.status(404).json({ message: "404 Not found )*:" });
});

app.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`);
});
