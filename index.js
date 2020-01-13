// implement your API here

//imports
const express = require('express');
const cors = require('cors');
const PORT = 5025;
const hostname ='127.0.0.1';

const { find, findById, insert, update, remove} = require ('./data/db');

// express app

const app = express()

// extra functionality we need to be able to read req.body
app.use(express.json())

//enable cors

app.use(cors())


app.get('/', (req, res) => {
    res.status(200).json({"message": "App runs"});
});

app.get('/api/users', (req, res) => {
    find()
        .then(users => {
            res.status(200).json(users)
        })
        .catch(error => {
            res.status(500).json({
                message: error.message,
                stack: error.stack,
            })
        })
});

app.listen(PORT, hostname, () => {
    console.log(`App running http://${hostname}:${PORT}`)
})

