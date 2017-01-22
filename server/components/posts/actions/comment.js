const knex = require('../../../db_config/knex');
const bcrypt = require('bcrypt');

module.exports = (req, res, user) => {
    return new Promise((resolve, reject) => {
        knex('comments')
            .insert({
                comment: req.body.comment,
                user_id: user.id,
                post_id: req.body.post.id,
                comment_created_at: Date.now()
            }).returning('*')
            .then((comment) => {
                resolve({
                    success: comment[0]
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
