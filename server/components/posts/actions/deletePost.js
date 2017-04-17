const knex = require('../../../db_config/knex');

module.exports = (req, res) => {
    return new Promise((resolve, reject) => {
        knex('posts')
            .where({
                id: req.body.post.id
            }).del()
            .then((result) => {
                resolve({
                    success: result
                });
            })
            .catch((err) => {
                reject({
                    error: 'An error occurred when attempting to delete your post.',
                    reason: err
                });
            });
    });
};
