const knex = require('../../../db_config/knex');
const retrieveLikes = require('./retrieveLikes.js');

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
                    reason: err
                });
            });
    });
};
