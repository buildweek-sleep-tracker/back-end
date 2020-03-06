
exports.up = function(knex) {
  return knex.schema
    .createTable("users", table => {

    table.increments();

    table.string("email", 32)
        .notNullable()
        .unique()
        .index()

    table.string("password", 64)
        .notNullable()

    table.string("first_name", 32)

    table.string("last_name", 32)

  })
};

exports.down = function(knex) {

    return knex.schema
        .dropTableIfExists("users");
};
