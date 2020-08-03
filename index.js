const express = require("express")

const server = express()

const port = 8001
server.listen(port, () => console.log(`server running on port: ${port}`))

server.get("/hello", (req, res) => {
    res.send("Hello World!");
});