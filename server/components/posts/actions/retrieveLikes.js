const knex = require('../../../db_config/knex');

module.exports = (req, res) => {
    return new Promise((resolve, reject) => {
        knex('likes')
            .where({
                post_id: req.params.id
            })
            .first()
            .count()
            .then((likes) => {
                resolve(likes.count);
            })
            .catch((err) => {
                reject({
                    error: 'An error occurred when attempting to retrieve likes.',
                    reason: err
                });
            });
    });
};
