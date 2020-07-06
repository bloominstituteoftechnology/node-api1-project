
let server = require("./server");

let PORT = 1123;

server.listen(PORT, () => {
    console.log(`\n == API running on port ${PORT} == \n`)
})