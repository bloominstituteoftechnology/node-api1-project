// implement your API here
const express = require('express');
const server = express();
server.use(express.json());

server.get("/", function(request, response) {
    response.send({})
})
const port = 8000;

server.listen(port, () => console.log(`\n ** api on port: ${port} ** \n`))