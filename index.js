const express = require('express');
let db = require('./data/db');

const app = express();
app.use(express.json());

const hostname = '127.0.0.1';
const port = 5001;

app.get('/api/users', (req, res) =>{
    console.log('remote:', req.ip)
    res.json(db.find())
})

app.listen(port, hostname, ()=>{
    console.log(`Express Server running at http://${hostname}:${port}`);
})