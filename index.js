const express = require('express');
const shortid = require('shortid');//genrate unique id's
//console.log(shortid.generate());

const server = express();



//middleware
server.use(express.json());

//endpoints
server.get('/', (req,res) => {
    res.json({api: "is running..."});
});



const port = 5000;//run server on port 5000
server.listen(port, () => console.log(`\n***** api on port ${port} *****\n`));