const express = require('express');
const shortid = require('shortid');//genrate unique id's
//console.log(shortid.generate());

const server = express();





const port = 5000;//run server on port 5000
server.listen(port, () => console.log(`\n***** api on port ${port} *****\n`));