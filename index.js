// implement your API here
const express = require('express');

const server = express();
const port = 5000; 

server.get('/', (req, res) => {
    res.send({ api: 'testing api is running...'});
});

server.listen(port, () => {
    console.log(`\n API running on port ${port} \n`);
});