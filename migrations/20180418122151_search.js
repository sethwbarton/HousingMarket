

exports.up = function(knex, Promise) {
  return Promise.all([
    knex.raw("alter table contracts add fulltext(description)"),
  ]);
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.raw("alter table contracts drop index description"),
  ]);
};
