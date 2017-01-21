const knex = require('../../../db_config/knex');
const bcrypt = require('bcrypt');

module.exports = (req, res) => {
    return new Promise((resolve, reject) => {
        knex('comments')
            .where({
                post_id: req.params.id
            })
            .then((comments) => {
                resolve({
                    success: comments
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
