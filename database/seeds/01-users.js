const faker = require("faker");
const bcrypt = require("bcryptjs");

exports.seed = function (knex) {
  return knex("users").insert([
    {
      age: faker.datatype.number(),
      location: faker.address.city(),
      email: faker.internet.email(),
      username: faker.name.findName(),
      password: bcrypt.hashSync("test1", 10),
    },
    {
      age: faker.datatype.number(),
      location: faker.address.city(),
      email: faker.internet.email(),
      username: faker.name.findName(),
      password: bcrypt.hashSync("test1", 10),
    },
    {
      age: faker.datatype.number(),
      location: faker.address.city(),
      email: faker.internet.email(),
      username: faker.name.findName(),
      password: bcrypt.hashSync("test1", 10),
    },
    {
      age: faker.datatype.number(),
      location: faker.address.city(),
      email: faker.internet.email(),
      username: faker.name.findName(),
      password: bcrypt.hashSync("test1", 10),
    },
    {
      age: faker.datatype.number(),
      location: faker.address.city(),
      email: faker.internet.email(),
      username: faker.name.findName(),
      password: bcrypt.hashSync("test1", 10),
    },
  ]);
};
