const express = require('express');
const shortid = require('shortid');
const server = express();

server.use(express.json());




const Port = 5000;

server.listen(PORT,() => {
    console.log(`listening on http://localhost:${PORT}`);
});