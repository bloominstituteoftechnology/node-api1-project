const express = require("express");
const generate = require("shortid").generate;
const rateLimit = require("express-rate-limit");
const app = express();
app.use(express.json());

const PORT = 1234;

let office = [
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

app.get("/users", (req, res) => {
  res.status(200).json(office);
});

app.get("*", (req, res) => {
  res.status(404).json({ message: "404 Not found )*:" });
});

app.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`);
});
