exports.up = function (knex) {
  return knex.schema.createTable("powers", function (tbl) {
    tbl.increments("id");
    tbl.boolean("power").notNull().defaultTo(0); // true or false
    tbl.string("planet", 128).notNull();
  });
};

exports.down = function (knex) {
  return knex.schemadropTableIfExists("powers");
};
