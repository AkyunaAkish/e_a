const retrieveComments = require('../actions/retrieveComments.js');

module.exports = (req, res) => {
    retrieveComments(req, res)
        .then((comments) => {
            if (comments.success) {
                res.json({
                    success: comments.success
                });
            } else {
                res.json({
                    error: comments.error || 'Comments could not be retrieved.'
                });
            }
        })
        .catch((err) => {
            res.json({
                error: err
            });
        });
};
