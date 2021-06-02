const server = require('./api/server');

const port = 5000;
const message = "Server Running: localhost:5000"
// START YOUR SERVER HERE
server.listen(port, () => {
    console.log(message)
})