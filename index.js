// 1. dependencies
const express = require("express");
const generate = require("shortid").generate;

// 2. instantiate and configure server
const app = express();
app.use(express.json());

// 3. choosing port #
const PORT = 3000;

// 4. your data (fake data in our case)
let users = [
  {
    id: generate(), // hint: use the shortid npm package to generate it
    name: "Jane Doe", // String, required
    bio: "Not Tarzan's Wife, another Jane", // String, required
  },
];

// 5. Endpoints
//[GET] al users in db
app.get("/api/users", (req, res) => {
  res.status(200).json(users);
});

app.post("/api/users", (req, res) => {
  const { name, bio } = req.body;
  if (!name || !bio) {
    res.status(400).json({
      message: "Please provide name and bio for the user.",
    });
  } else {
    const newUser = { id: generate(), name, bio };
    users.push(newUser);
  }
});

app.get("/api/users/:id", (req, res) => {
  const { id } = req.params;
  const user = users.find((user) => user.id === id);
  if (!user) {
    res.status(404).json({
      message: `No user with id ${id}`,
    });
  } else {
    res.status(200).json(user);
  }
});

app.put("/api/users/:id", (req, res) => {
  const { id } = req.params;
  const { name, bio } = req.body;
  const indexOfUser = dogs.findIndex((user) => user.id === id);
  if (indexOfUser !== -1) {
    users[indexOfUser] = { id, name, bio };
    res.status(200).json({ id, name, bio });
  } else {
    res.status(404).json({
      message: `No user with id ${id}`,
    });
  }
});

app.delete("/api/users/:id", (req,res) => {
    const { id } = req.params;
    try {
        if(!users.find((user) => user.id === id)) {
            res.status(404).json({ message: 'Not found'});
        } else {
            users = users.filter((user) => user.id !==id);
            res.status(200).json({ message: `The user with id ${id} got deleted` });
        }
    } catch (error) {
        res.status(500).json({ message:  "You really messed that up "});
    }
});

// catch all endpoints (404 resource not found)
app.use("*", (req, res) => {
  res.status(404).json({ message: "Not found" });
});

app.listen(PORT, () => {
  console.log(`LISTENING ON PORT ${PORT}`);
});
