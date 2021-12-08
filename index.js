const express = require('express');
const server = require('./api/server');
const cors = require('cors');
const app = express();
const port = 9000;

// START YOUR SERVER HERE
app.use(express.urlencoded({extended: true}))
app.use(express.json());
app.use(cors());
app.use('/api/users', server);

app.listen(port, () => {
  console.log(`App is running on PORT: ${port}`);
})
