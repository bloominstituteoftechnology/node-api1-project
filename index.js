const server = require("./api/server");

const port = 5000;

server.listen(port, () => {
  console.log(`\n*** Server running on http://localhost:${port}***\n`);
});

// START YOUR SERVER HERE
