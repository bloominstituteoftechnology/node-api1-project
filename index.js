const server = require('./api/server');


const express = require("express")
const app = express();
app.use(express.json())

const port = 5000;


// START YOUR SERVER HERE

app.listen(port,()=>{
    console.log(`Server is running on ${port}`)
})