const knex = require('../../../db_config/knex');

module.exports = (req, res) => {
    return new Promise((resolve, reject) => {
        if (req.body.session.user.username &&
            typeof req.body.session.user.username == 'string' &&
            req.body.session.user.email &&
            typeof req.body.session.user.email == 'string' &&
            req.body.session.token &&
            typeof req.body.session.token == 'string') {
            knex('users')
                .where({
                    username: req.body.session.user.username,
                    email: req.body.session.user.email
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
                error: 'Insufficient session data provided.'
            });
        }
    });
};
