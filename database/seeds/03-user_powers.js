exports.seed = function (knex) {
  return knex("user_powers").insert([
    { user_id: 1, power_id: 1 }, // user id of 1 is equal to power id of 1
    { user_id: 2, power_id: 2 },
    { user_id: 3, power_id: 3 },
  ]);
};
