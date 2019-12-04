// implement your API here
const express = require('express');
const app = express();
app.use(express.json());
const PORT = 8080;
const hostname = '127.0.0.1';
const database = require("./data/db.js");

app.use(express.json());

app.get("/", (req,res) => {
    res.status(200).json({"msg": "App is working now"});
});

app.get("/api/users", (req,res) => {
    const users = database.find();
    res.status(200).json(users);
});

app.listen(PORT,hostname, () => {
   console.log(`app running at http://${hostname}:${PORT}`);
})
