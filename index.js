// implement your API here
const express = require('express');

const Users = require('./data/db')

const server = express();

server.user(express.json());

