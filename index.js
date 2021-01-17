const server = require('./server');

const PORT = 5000

server.listen(PORT, () => {
    console.log(`\n*** server listening on port ${PORT} ***\n`);
})