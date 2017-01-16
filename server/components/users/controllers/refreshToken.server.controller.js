const retrieveUser = require('../actions/retrieveUser.js');
const createToken = require('../actions/createToken.js');

module.exports = (req, res) => {
    if (req.body.user &&
        typeof req.body.user === 'object' &&
        req.body.token &&
        typeof req.body.token === 'string' &&
        req.body.user.email &&
        typeof req.body.user.email === 'string' &&
        req.body.user.username &&
        typeof req.body.user.username === 'string') {
        retrieveUser(req.body.user.email)
            .then((user) => {
                if (user && user.success && user.success.username && user.success.email && user.success.id) {
                    createToken(user.success)
                        .then((token) => {
                            if (token.success) {
                                res.json({
                                    success: {
                                        user: {
                                            username: user.success.username,
                                            email: user.success.email
                                        },
                                        token: token.success
                                    }
                                });
                            } else {
                                res.json({
                                    error: token
                                });
                            }
                        })
                        .catch((err) => {
                            res.json(err);
                        });
                } else {
                    res.json({
                        error: 'An error occurred, please sign in.'
                    });
                }
            })
            .catch((err) => {
                res.json({
                    error: 'An error occurred, please sign in.',
                    reason: err
                });
            });
    } else {
        res.json({
            error: 'An error occurred, please sign in.'
        });
    }
};
