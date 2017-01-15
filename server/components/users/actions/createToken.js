require('dotenv').config();
const knex = require('../../../db_config/knex');
const jwt = require('jsonwebtoken');

module.exports = (id) => {
    return new Promise((resolve, reject) => {
        const token = jwt.sign({
            id: id
        }, process.env.SECRET, {
            expiresIn: process.env.SESSION_LIMIT
        });

        if (token) {
            resolve({
                success: token
            });
        } else {
            reject({
                error: 'An error occurred, please sign in.',
                reason: 'Session token could not be created.'
            });
        }

    });
};
