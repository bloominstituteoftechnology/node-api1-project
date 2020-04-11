const express = require('express');
const cors = require('cors');

const server = express();
const port = 4000;

server.listen(port, () => {
    console.log(`\n <=== Server listening on port ${port}! ===> \n`);
});

module.exports = server;
