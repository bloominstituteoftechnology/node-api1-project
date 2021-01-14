const server = require("./server");

const port = 5000;

server.listen(port, () => {
  console.log(`Server is Listening on port: ${port}`);
});
