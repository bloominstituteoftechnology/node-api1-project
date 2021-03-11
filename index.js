const server = require('./api/server.js');

const port = 5000;

// START YOUR SERVER HERE
server.list(port, () =>{
    console.log(`\n ***listening on port ${port}*** \n`)
})