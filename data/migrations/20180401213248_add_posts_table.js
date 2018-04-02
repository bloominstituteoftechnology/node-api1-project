exports.up = function(knex, Promise) {
  console.log('creating users table');

  return knex.schema.createTable('users', function(users) {
    users.increments();

    users.string('name', 255).notNullable();
    users.text('bio').notNullable();

    users.timestamps(true, true);

    console.log('users table created');
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('users');
};
