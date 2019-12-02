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

app.get('/users/:id', (req,res)=>{
    const id = req.params.id;

    db.findById(id)
    .then((user)=>{
        res.status(200).json({user})
    })
    .catch((err)=>{
        res.status(500).json({err})
    })
})

app.delete('/users/:id', (req,res)=>{
    const id = req.params.id;
    db.remove(id)
    .then((user)=>{
        res.status(200).json({user})
    })
    .catch((err)=>{
        res.status(500).json({err})
    })
})

app.put('/users/:id', (req,res)=>{

    const user = req.body;
    const id = req.params.id;

    db.update(id, user)
    .then(user=>{
        res.status(200).json({user})
    })
    .catch(err=>{
        res.status(500).json({err})
    })
})



app.listen(port, ()=>{console.log(`listening: ${port}`)})

