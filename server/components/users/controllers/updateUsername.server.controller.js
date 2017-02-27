const updateUsername = require('../actions/updateUsername.js');

module.exports = (req, res) => {
    if (req.body.session && req.body.newUsername) {
        updateUsername(req, res)
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
            error: {
                message: 'Insufficient data provided.'
            }
        });
    }
};
