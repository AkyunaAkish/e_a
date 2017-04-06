const updateSecurityQuestionsAndAnswers = require('../actions/updateSecurityQuestionsAndAnswers.js');

module.exports = (req, res) => {
    if (req.body.session) {
        updateSecurityQuestionsAndAnswers(req, res)
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
                message: 'You are not signed in.'
            }
        });
    }
};
