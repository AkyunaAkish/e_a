const knex = require('../../../db_config/knex');
const bcrypt = require('bcrypt');

module.exports = (req, res) => {
    return new Promise((resolve, reject) => {
        knex('posts')
            .insert({
                title: req.body.post.title,
                thumbnail_url: req.body.post.thumbnail_url,
                content: req.body.post.content,
                created_at: Date.now()
            }).returning('*')
            .then((post) => {
                resolve({
                    success: post[0]
                });
            })
            .catch((err) => {
                reject({
                    error: 'An error occurred when attempting to submit your post.',
                    psql_error: err
                });
            });
    });
};
