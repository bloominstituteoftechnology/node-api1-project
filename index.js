const express = require('express');
const userRouter = require('./Router/router');
const server = require('./server');

server.use(express.json());

server.get('/', (req, res) => {
    res.send('API is running...');
});

server.use('/api/users', userRouter);




