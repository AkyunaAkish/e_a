require('dotenv').config();
const knex = require('../../../db_config/knex');
const jwt = require('jsonwebtoken');

module.exports = (id) => {
    return new Promise((resolve, reject) => {
        const token = jwt.sign({
            id: id
        }, process.env.SECRET);

        if (token) {
            resolve({
                success: token
            });
        } else {
            reject({
                error: 'An error occurred when attempting to sign you up.',
                reason: 'Session token could not be created.'
            });
        }

    });
};
