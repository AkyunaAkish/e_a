const knex = require('../../../db_config/knex');

module.exports = (email) => {
    return new Promise((resolve, reject) => {
        if (email &&
            typeof email == 'string') {
            knex('users')
                .where({
                    email: email
                })
                .first()
                .then((user) => {
                    resolve({
                        success: user
                    });
                })
                .catch((err) => {
                    reject(err);
                });
        } else {
            reject({
                error: 'Insufficient data provided.'
            });
        }
    });
};
