const server = require('./api/server');

const port = 5000;

server.listen(port, () => {
    console.log("server started at localhost:5000")
})
