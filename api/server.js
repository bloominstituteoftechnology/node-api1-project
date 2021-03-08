// BUILD YOUR SERVER HERE
const express = require("express"); //import express from 'express' in commonjs
const { create } = require("./users/model.js");
const Users = require("./users/model");

const server = express();

server.use(express.json());

module.exports = server; // EXPORT YOUR SERVER instead of {}
