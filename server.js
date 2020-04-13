const express = require('express');
const cors = require('cors');
require("dotenv").config();

const server = express();
const port = process.env.PORT || 4000;

server.listen(port, () => {
    console.log(`\n <=== Server listening on port ${port}! ===> \n`);
});

module.exports = server;
