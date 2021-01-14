const express = require('express');
const server = express();


server.get('/', (req, res) =>
{
    res.send('Heck yeah, heck yeah');

})

server.listen(5000, ( ) =>{
    console.log('Heck yeah, we are up and running on local host 5000')
})