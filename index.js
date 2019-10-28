// implement your API here
const express = require('express'); 
const server = express(); 

server.get('/', (req, res) => {
    res.send('Hello Node23!!!!');
});


const port = 8000; 
server.listen(port, () => console.log('\n=== API on port 8000 ===\n'))

