exports.up = (knex, Promise) => {
    return knex.schema.createTable('users', (table) => {
        table.increments();
        table.string('username').unique().notNullable();
        table.string('email').unique().notNullable();
        table.string('password').notNullable();
        table.string('security_question_one').notNullable();
        table.string('security_answer_one').notNullable();
        table.string('security_question_two').notNullable();
        table.string('security_answer_two').notNullable();
        table.boolean('admin').notNullable().defaultTo(false);
        table.bigInteger('user_created_at').notNullable();
    });
};

exports.down = (knex, Promise) => {
    return knex.schema.dropTable('users');
};
