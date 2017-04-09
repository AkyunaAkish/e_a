const retrieveUser = require('../actions/retrieveUser.js');

module.exports = (req, res) => {
    if (req.params.email) {
        retrieveUser(req.params.email)
            .then((userRes) => {
                if (userRes.success) {
                    delete userRes.success.password;
                    if (req.params.limit === 'true') {
                        delete userRes.success.security_answer_one;
                        delete userRes.success.security_answer_two;
                        delete userRes.success.admin;
                    }
                    res.json({
                        success: userRes.success
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
            error: 'No email parameter provided to URL.'
        });
    }
};