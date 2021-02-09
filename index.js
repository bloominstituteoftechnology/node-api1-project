const server = require('./api/server');

const port = 9998;

// START YOUR SERVER HERE
server.listen(port, () => {
    console.log(`Server is running on port ${port}`)
})