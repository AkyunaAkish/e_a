exports.up = (knex, Promise) => {
    return knex.schema.createTable('likes', (table) => {
        table.increments();
        table.integer('user_id').unsigned().references('id').inTable('users');
        table.integer('post_id').unsigned().references('id').inTable('posts');
        table.bigInteger('like_created_at').notNullable();
    });
};

exports.down = (knex, Promise) => {
    return knex.schema.dropTable('likes');
};
