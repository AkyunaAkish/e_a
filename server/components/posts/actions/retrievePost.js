const knex = require('../../../db_config/knex');
const bcrypt = require('bcrypt');

module.exports = (id) => {
    return new Promise((resolve, reject) => {
        knex('posts')
            .where({
                id: id
            })
            .first()
            .then((post) => {
                resolve({
                    success: post
                });
            })
            .catch((err) => {
                reject({
                    error: 'An error occurred when attempting to retrieve post.',
                    psql_error: err
                });
            });
    });
};
