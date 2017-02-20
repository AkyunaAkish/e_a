const knex = require('../../../db_config/knex');

module.exports = (req, res) => {
    return new Promise((resolve, reject) => {
        knex('comments')
            .where({
                id: req.body.comment.comment_id
            })
            .del()
            .returning('*')
            .then((comment) => {
                resolve({
                    success: comment
                });
            })
            .catch((err) => {
                reject({
                    error: 'An error occurred when attempting to delete comment.',
                    reason: err
                });
            });
    });
};
