exports.up = (knex, Promise) => {
    return knex.schema.createTable('posts', (table) => {
        table.increments();
        table.string('title').notNullable();
        table.string('thumbnail_url').notNullable();
        table.text('content', 'longtext').notNullable();
        table.bigInteger('created_at').notNullable().defaultTo(Date.now());
    });
};

exports.down = (knex, Promise) => {
    return knex.schema.dropTable('posts');
};
