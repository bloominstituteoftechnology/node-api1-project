const server = require('./api/server');
const hostname = '127.0.0.1'
const port = 5000;

// START YOUR SERVER HERE
server.listen(port, () => {
    console.log(`server listening on http://${hostname}:${port}`);
})