// implement your API here
const express = require('express');
const server = express();
const PORT = 5000;
server.listen(PORT, () => console.log(`\n ** API on http://localhost:${PORT} **\n)`));