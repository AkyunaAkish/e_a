const retrieveAllPosts = require('../actions/retrieveAllPosts.js');

module.exports = (req, res) => {
    retrieveAllPosts()
        .then((posts) => {
            if (posts.success) {
                res.json({
                    success: posts.success
                });
            } else {
                res.json({
                    error: posts.error || 'Posts could not be retrieved.'
                });
            }
        })
        .catch((err) => {
            res.json({
                error: err
            });
        });
};
