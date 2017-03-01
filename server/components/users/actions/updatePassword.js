require('dotenv').config();
const knex = require('../../../db_config/knex');
const bcrypt = require('bcrypt');

module.exports = (req, res) => {
    return new Promise((resolve, reject) => {
        const password_hash = bcrypt.hashSync(req.body.newPassword, 10);

        knex('users')
            .where({
                email: req.body.email
            })
            .update({
                password: password_hash
            })
            .then((result) => {
                resolve(result);
            })
            .catch((err) => {
                reject(err);
            });
    });
};
