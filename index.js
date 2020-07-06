// Pulling server from server.js
const server = require("./server");

// Fixed port for server to run on
const PORT = 5000;

// Listening for server
server.listen(PORT, () => {
    console.log(`\n <== Running on port ${PORT} ==> \n`);
});
