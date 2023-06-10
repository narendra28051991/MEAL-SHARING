/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable("review", (table) => {
        table.increments("id").primary();
        table.string("title").notNullable();
        table.text("description").notNullable();
        table.integer('meal_id').unsigned().notNullable();
        table.integer("stars").notNullable();
        table.foreign('meal_id').references('meal.id');
        table.timestamps(true, true);
      })  
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.dropTableIfExists("review");  
};
