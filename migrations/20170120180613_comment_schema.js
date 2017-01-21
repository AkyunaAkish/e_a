exports.up = (knex, Promise) => {
    return knex.schema.createTable('comments', (table) => {
        table.increments();
        table.text('comment', 'longtext').notNullable();
        table.integer('user_id').unsigned().references('id').inTable('users');
        table.integer('post_id').unsigned().references('id').inTable('posts');
        table.bigInteger('created_at').notNullable();
    });
};

exports.down = (knex, Promise) => {
    return knex.schema.dropTable('comments');
};
