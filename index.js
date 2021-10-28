const express = require("express");
const server = express();
const PORT = process.env.PORT || 5280;

server.listen(PORT, () => {
  console.log(`server running on port ${PORT}`);
});
