/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable("meal", (table) => {
      table.increments("id").primary();
      table.string("title").notNullable();
      table.text("description").notNullable();
      table.string("location").notNullable();
      table.dateTime("when").notNullable();
      table.integer("max_reservations").notNullable();
      table.decimal("price").notNullable;
      table.timestamps(true, true);
    })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.dropTableIfExists("meal");
};
