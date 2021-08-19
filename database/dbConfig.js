const knex = require("knex");
const config = require("../knexfile");

const enviroment = process.env.NODE_ENV || "development";
module.exports = knex(config[enviroment]);
