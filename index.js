require("dotenv").config();
const server = require("./api/server");
const PORT = process.env.PORT || 5280;
console.log(process.env.PORT);

server.listen(PORT, () => {
  console.log(
    `\n** Server is Listening on port ${PORT} in ${process.env.NODE_ENV} **`
      .america
  );
});
