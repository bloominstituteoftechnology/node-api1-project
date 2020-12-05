//Imported express
const express = require('express');

//Connected server = express
const server = express();

//Created port
const PORT = 5000;

//Listening
server.listen(PORT, () => {
    console.log(`Server listening on PORT ${PORT}`);
})

//Test get
server.get('/', (req, res) => {
    res.json('<h1>Hello, World</h1>');
})