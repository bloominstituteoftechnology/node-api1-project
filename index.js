const express = require('express');
const app = express();

const users = [];

app.get("/api/users", (req, res)=>{
    res.send(users);
});

app.listen(5000, ()=> console.log("App is running on port 5000"));