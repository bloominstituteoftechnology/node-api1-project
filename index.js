const express = require('express');
const db = require('./data/db');

const app = express();
app.use(express.json());

const port = 8080;

app.get("/users", (req,res)=>{
    db.find()
    .then(users=>{
        res.status(200).json({users})
    })
    .catch((err)=>{
        res.status(500).json({err})
    })
})

app.post("/users", (req,res)=>{
    const body = req.body;
    db.insert(body)
    .then((user)=>{
        res.status(200).json({user})
    })
    .catch((err)=>{
        res.status(400).json({err})
    })
})



app.listen(port, ()=>{console.log(`listening: ${port}`)})

