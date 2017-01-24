const knex = require('../../../db_config/knex');
const bcrypt = require('bcrypt');

module.exports = (req, res) => {
    return new Promise((resolve, reject) => {
        knex.raw(`SELECT
                  comments.id AS comment_id,
                  comments.comment AS comment,
                  comments.user_id AS user_id,
                  comments.post_id AS post_id,
                  comments.comment_created_at AS comment_created_at,
                  users.id AS user_id,
                  users.username AS username,
                  users.email AS email,
                  users.admin AS admin
                  FROM comments inner join users
                  ON comments.user_id = users.id
                  WHERE comments.post_id = ${req.params.id}`)
            .then((comments) => {
                resolve({
                    success: comments.rows
                });
            })
            .catch((err) => {
                reject({
                    error: 'An error occurred when attempting to retrieve comments.',
                    reason: err
                });
            });
    });
};
