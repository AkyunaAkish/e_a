const updatePassword = require('../actions/updatePassword.js');
const retrieveUser = require('../actions/retrieveUser.js');
const verifyPassword = require('../actions/verifyPassword.js');

module.exports = (req, res) => {
    if (req.body.session && req.body.currentPassword && req.body.newPassword) {
        retrieveUser(req.body.email)
            .then((userRes) => {
                if (userRes.success) {
                    verifyPassword(req.body.currentPassword, userRes.success.password)
                        .then((verifyRes) => {
                            if (verifyRes.success) {
                                updatePassword(req, res)
                                    .then((success) => {
                                        res.json({
                                            success: success
                                        });
                                    })
                                    .catch((err) => {
                                        res.json({
                                            error: {
                                                message: 'Internal server error.',
                                                reason: err
                                            }
                                        });
                                    });
                            } else {
                                res.json({
                                    error: 'Email or password incorrect.'
                                });
                            }
                        })
                        .catch((err) => {
                            res.json({
                                error: 'Email or password incorrect.'
                            });
                        });
                } else {
                    res.json({
                        error: 'User with that email could not be found.'
                    });
                }
            })
            .catch((err) => {
                res.json({
                    error: 'User with that email could not be found.'
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
