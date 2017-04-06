require('dotenv').config();
const knex = require('../../../db_config/knex');
const bcrypt = require('bcrypt');

module.exports = (req, res) => {
    return new Promise((resolve, reject) => {
        knex('users')
            .where({
                email: req.body.session.user.email
            })
            .update({
                security_question_one: req.body.newSecurityQuestionsAndAnswers.securityQuestionOne,
                security_question_two: req.body.newSecurityQuestionsAndAnswers.securityQuestionTwo,
                security_answer_one: req.body.newSecurityQuestionsAndAnswers.securityAnswerOne,
                security_answer_two: req.body.newSecurityQuestionsAndAnswers.securityAnswerTwo
            })
            .then((result) => {
                resolve(result);
            })
            .catch((err) => {
                reject(err);
            });
    });
};