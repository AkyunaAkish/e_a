const verifyAdmin = require('../actions/verifyAdmin.js');
const retrieveUser = require('../actions/retrieveUser.js');

module.exports = (req, res) => {
    retrieveUser(req.body.user.email)
        .then((user) => {
            if (user.success) {
                verifyAdmin(req, res, user.success, req.body.token)
                    .then((verifyRes) => {
                        if (verifyRes.success) {
                            res.json({
                                success: verifyRes.success
                            });
                        } else {
                            res.json({
                                error: 'Not admin',
                                reason: verifyRes.error || null
                            });
                        }
                    })
                    .catch((err) => {
                        res.json({
                            error: err
                        });
                    });
            } else {
                res.json({
                    error: 'Could not retrieve user for validation of session'
                });
            }
        })
        .catch((err) => {
            res.json({
                error: err
            });
        });
};
