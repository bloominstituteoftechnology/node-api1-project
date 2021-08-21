exports.up = function (knex) {
  return knex.schema.createTable("user_powers", (tbl) => {
    tbl
      .integer("user_id")
      .unsigned()
      .notNull()
      .references("users.id")
      .onDelete("CASCADE")
      .onUpdate("CASCADE");
    tbl
      .integer("power_id")
      .unsigned()
      .notNull()
      .references("powers.id")
      .onUpdate("CASCADE");
    tbl.primary(["user_id", "power_id"]);
  });
};

exports.down = function (knex) {
  return knex.schema.dropTableIfExists("user_powers");
};
