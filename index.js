// implement your API here
const express = require('express');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(express.json());

app.get('*', handleRequest)
app.post('*', handleRequest)
app.put('*', handleRequest)
app.delete('*', handleRequest)
app.patch('*', handleRequest)

function handleRequest(req, res) {
    res.json('You have reached the end of the internet')    
}

app.listen(process.env.port || 7000, () => {
    console.log(`listening on port ${process.env.port || 7000}`);
})