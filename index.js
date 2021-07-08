const express = require("express");
const generate = require("shortid").generate;

const app = express();
app.use(express.json());

const PORT = 1234;

const users = () => [
  { id: shortid.generate(), name: "Ed Carter", bio: "hero" },
  { id: shortid.generate(), name: "Mary Edwards", bio: "super hero" },
];

console.log("node just run me me me");
// START YOUR SERVER HERE
app.get((req, res) => {
  res.status("new status");
});
app.get("*", (req, res) => {
  res.status(404).json({ message: "404 Not found )*:" });
});
app.listen(PORT, () => {
  console.log(`server running on port: ${PORT}`);
});
