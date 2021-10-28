require('dotenv').config()
const server = require('./api/server');

const port = process.env.PORT || 5000;
// console.log(process.env.PORT)

// START YOUR SERVER HERE

server.listen(port, () => {
    console.log(
        `\n** Server running on ${port} in ${process.env.NODE_ENV} mode!`
        .blue
    );
})