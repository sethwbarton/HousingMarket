exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.createTable('contracts', function(table) {
      table.increments('id').primary();
      table.string('description');
      table.string('amenities');
      table.string('address');
      table.dateTime('created');
      table.integer('user_id').unsigned().notNullable().references('id').inTable('users');
    }),
  ]);
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.dropTable('contracts'),
  ]);
};
