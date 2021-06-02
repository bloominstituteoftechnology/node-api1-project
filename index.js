const server = require('./api/server.js');
const port = 5000;

server.listen(port, () => {
    console.log("server is running on 5000")
})
