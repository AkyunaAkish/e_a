require('dotenv').config();
const updatePassword = require('../actions/updatePassword.js');
const retrieveUser = require('../actions/retrieveUser.js');
const verifyPassword = require('../actions/verifyPassword.js');

module.exports = (req, res) => {
    if (req.body.email && req.body.securityAnswerOne && req.body.securityAnswerTwo && req.body.newPassword) {
        retrieveUser(req.body.email)
            .then((user) => {
                if (user && user.success &&
                    !(user.success.username.toLowerCase() == process.env.ADMIN.toLowerCase()) &&
                    user.success.security_answer_one.toLowerCase().trim() == req.body.securityAnswerOne.toLowerCase().trim() &&
                    user.success.security_answer_two.toLowerCase().trim() == req.body.securityAnswerTwo.toLowerCase().trim()) {
                    updatePassword(req, res)
                        .then((success) => {
                            res.json({
                                success: success
                            });
                        })
                        .catch((err) => {
                            res.json({
                                error: {
                                    message: 'User not found or security answers incorrect.'
                                }
                            });
                        });
                } else if (user.success.username.toLowerCase() == process.env.ADMIN.toLowerCase()) {
                    res.json({
                        error: {
                            message: 'Site admins need the system administrator to update their passwords.'
                        }
                    });
                } else {
                    res.json({
                        error: {
                            message: 'Insufficient data provided.'
                        }
                    });
                }
            })
            .catch((err) => {
                res.json({
                    error: 'An error occurred.',
                    reason: err
                });
            });
    } else {
        res.json({
            error: {
                message: 'Insufficient data provided.'
            }
        });
    }
};