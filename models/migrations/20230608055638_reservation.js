/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable("reservation", (table) => {
      table.increments("id").primary();
      table.integer("number_of_guests").notNullable();
      table.integer('meal_id').unsigned().notNullable();
      table.string("contact_number").notNullable();
      table.string("contact_name").notNullable();
      table.string("contact_email").notNullable();
      table.foreign('meal_id').references('meal.id');
      table.timestamps(true, true);
    })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.dropTableIfExists("reservation");
};
