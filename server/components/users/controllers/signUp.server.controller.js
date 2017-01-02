const createUser = require('../actions/createUser.js');
const createToken = require('../actions/createToken.js');

module.exports = (req, res) => {
    createUser(req, res)
        .then((user) => {
            if (user.success && user.success.id) {
                createToken(user.success.id)
                    .then((token) => {
                        res.json({
                            success: {
                                user: {
                                    id: user.success.id,
                                    username: user.success.username,
                                    email: user.success.email
                                },
                                token: token.success
                            }
                        });
                    })
                    .catch((err) => {
                        res.json(err);
                    });
            } else {
                res.json({
                    error: 'An error occurred when attempting to sign you up.'
                });
            }
        })
        .catch((err) => {
            res.json({
                error: 'An error occurred when attempting to sign you up.',
                reason: err
            });
        });
};
