const express = require('express');

const server = express();

server.use(express.json())




const port = 8000

server.listen(port, () => console.log(`\n == API on port ${port} == \n`))