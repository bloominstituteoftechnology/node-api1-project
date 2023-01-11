const server = require('./api/server');

const port = 9000;

server.listen(port, () => {
    console.log(`server started on http://localhost:${port}`)
})

// START YOUR SERVER HERE
