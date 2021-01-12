const server = require("./api/server.js");
const PORT = 5000;

server.listen(PORT, () => {
  console.log(`Now listening on port ${PORT}`);
});
