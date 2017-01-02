const verifyAdmin = require('../actions/verifyAdmin.js');

module.exports = (req, res) => {
    verifyAdmin(req, res, req.body.user, req.body.token)
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
};
