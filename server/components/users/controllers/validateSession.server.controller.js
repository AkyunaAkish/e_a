const retrieveUserFromSession = require('../actions/retrieveUserFromSession.js');
const verifyToken = require('../actions/verifyToken.js');

module.exports = (req, res) => {
    retrieveUserFromSession(req, res)
        .then((user) => {
            if (user.success && req.body.session && req.body.session.token) {
                verifyToken(req, res, user.success, req.body.session.token)
                    .then((tokenRes) => {
                        if (tokenRes.success) {
                            delete user.success.password;
                            res.json({
                                success: {
                                    userSuccess: user.success,
                                    tokenSuccess: tokenRes.success
                                }
                            });
                        } else {
                            res.json({
                                error: 'Login information could not be retrieved, please login or sign up.'
                            });
                        }
                    })
                    .catch((err) => {
                        res.json({
                            error: 'Login information could not be retrieved, please login or sign up.',
                            reason: err
                        });
                    });
            } else {
                res.json({
                    error: 'Login information could not be retrieved, please login or sign up.'
                });
            }
        })
        .catch((err) => {
            res.json({
                error: 'Login information could not be retrieved, please login or sign up.',
                reason: err
            });
        });
};
