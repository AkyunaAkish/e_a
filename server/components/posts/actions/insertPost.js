const knex = require('../../../db_config/knex');

module.exports = (req, res) => {
    return new Promise((resolve, reject) => {
        knex('posts')
            .insert({
                title: req.body.post.title,
                thumbnail_url: req.body.post.thumbnail_url,
                content: req.body.post.content,
                post_created_at: Date.now()
            }).returning('*')
            .then((post) => {
                resolve({
                    success: post[0]
                });
            })
            .catch((err) => {
                reject({
                    error: 'An error occurred when attempting to submit your post.',
                    reason: err
                });
            });
    });
};
