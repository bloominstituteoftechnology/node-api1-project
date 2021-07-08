const express = require("express");
const generate = require("shortid").generate;
const rateLimit = require("express-rate-limit");
const app = express();
app.use(express.json());

const PORT = 1234;

const users = () => [
  { id: shortid.generate(), name: "Ed Carter", bio: "hero" },
  { id: shortid.generate(), name: "Mary Edwards", bio: "super hero" },
];

const apiRequestLimiter = rateLimit({
  windowMs: 1 * 60 * 1000, // 1 minute
  max: 2, // limit each IP to 2 requests per windowMs
  message: "Your limit exceeded, too many requests, please come back later",
});
app.use(apiRequestLimiter);

console.log("node just run me me me");
// START YOUR SERVER HERE
app.get((req, res) => {
  res.status("new status");
});
// app.get("*", (req, res) => {
//   res.status(404).json({ message: "404 Not found )*:" });
// });

app.get("/users");

app.listen(PORT, () => {
  console.log(`server running on port: ${PORT}`);
});
