
exports.up = function(knex) {
  return knex.schema
    .createTable("sleep_data", table => {

        table.increments();

        table.integer("user_id")
            .unsigned()
            .notNullable()
            .references("id")
            .inTable("users")
            .onUpdate("CASCADE")
            .onDelete("RESTRICT")

        table.date("log_date")
            .notNullable()
        
        table.datetime("time_bedtime")
        table.datetime("time_wakeup")

        table.integer("rating_wakeup")
            .unsigned()
        table.integer("rating_day")
            .unsigned()
        table.integer("rating_bedtime")
            .unsigned()
        
        table.string("notes_wakeup", 512)
        table.string("notes_day", 512)
        table.string("notes_bedtime", 512)
    })
};

exports.down = function(knex) {
  return knex.schema
    .dropTableIfExists("sleep_data");
};
