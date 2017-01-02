exports.up = (knex, Promise) => {
    return knex.schema.createTable('users', (table) => {
        table.increments();
        table.string('username').unique().notNullable();
        table.string('email').unique().notNullable();
        table.string('password').notNullable();
        table.bigInteger('created_at').notNullable().defaultTo(Date.now());
    });
};

exports.down = (knex, Promise) => {
    return knex.schema.dropTable('users');
};
