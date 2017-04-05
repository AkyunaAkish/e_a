const knex = require('../../../db_config/knex');
const bcrypt = require('bcrypt');

module.exports = (req, res) => {
    return new Promise((resolve, reject) => {
        if (req.body.username &&
            typeof req.body.username === 'string' &&
            req.body.email &&
            typeof req.body.email === 'string' &&
            req.body.password &&
            typeof req.body.password === 'string' &&
            req.body.securityQuestionOne &&
            typeof req.body.securityQuestionOne === 'string' &&
            req.body.securityAnswerOne &&
            typeof req.body.securityAnswerOne === 'string' &&
            req.body.securityQuestionTwo &&
            typeof req.body.securityQuestionTwo === 'string' &&
            req.body.securityAnswerTwo &&
            typeof req.body.securityAnswerTwo === 'string') {
            const password_hash = bcrypt.hashSync(req.body.password, 10);
            const formattedUsername = req.body.username.split(' ').map((curr) => {
                return curr[0].toUpperCase() + curr.slice(1).toLowerCase();
            }).join(' ');

            knex('users')
                .insert({
                    username: formattedUsername,
                    email: req.body.email,
                    password: password_hash,
                    admin: formattedUsername === 'Elena Akish' ? true : false,
                    security_question_one: req.body.securityQuestionOne,
                    security_answer_one: req.body.securityAnswerOne,
                    security_question_two: req.body.securityQuestionTwo,
                    security_answer_two: req.body.securityAnswerTwo,
                    user_created_at: Date.now()
                }).returning('*')
                .then((user) => {
                    resolve({
                        success: user[0]
                    });
                })
                .catch((err) => {
                    reject({
                        error: 'An error occurred when attempting to sign you up.',
                        psql_error: err
                    });
                });

        } else {
            reject({
                error: 'You must provide a username, email, and password to sign up.'
            });
        }
    });
};
