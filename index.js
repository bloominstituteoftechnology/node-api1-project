const server = require('./api/server');

const port = 5002;

// START YOUR SERVER HERE
server.listen(port, () => {
    console.log(`you are running in port ${port}`)
})