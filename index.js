const server = require('./api/server.js');

const port = 5000;

server.listen(1234,()=>{
    console.log("server is live")
})