require('dotenv').config();
const knex = require('../../../db_config/knex');

module.exports = (req, res) => {
    return new Promise((resolve, reject) => {
        knex('users')
            .where({
                email: req.body.session.user.email
            })
            .update({
                email: req.body.newEmail
            })
            .then((result) => {
                resolve(result);
            })
            .catch((err) => {
                reject(err);
            });
    });
};
