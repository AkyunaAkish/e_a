const retrieveUser = require('../actions/retrieveUser.js');
const verifyPassword = require('../actions/verifyPassword.js');
const createToken = require('../actions/createToken.js');

module.exports = (req, res) => {
    if (req.body.email && req.body.password) {
        retrieveUser(req.body.email)
            .then((userRes) => {
                if (userRes.success) {
                    verifyPassword(req.body.password, userRes.success.password)
                        .then((verifyRes) => {
                            if (verifyRes.success) {
                                createToken(userRes.success)
                                    .then((createTokenRes) => {
                                        if (createTokenRes.success) {
                                            res.json({
                                                success: {
                                                    user: userRes.success,
                                                    token: createTokenRes.success
                                                }
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
    }
};
