require('dotenv').config();
const knex = require('../../../db_config/knex');

module.exports = (req, res) => {
    return new Promise((resolve, reject) => {
        knex('users')
            .where({
                username: req.body.session.user.username
            })
            .update({
                username: req.body.newUsername
            })
            .then((result) => {
                resolve(result);
            })
            .catch((err) => {
                reject(err);
            });
    });
};
