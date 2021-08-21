const faker = require("faker");

exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex("powers").insert([
    { power: faker.datatype.boolean(), planet: faker.name.title() },
    { power: faker.datatype.boolean(), planet: faker.name.title() },
    { power: faker.datatype.boolean(), planet: faker.name.title() },
  ]);
};
