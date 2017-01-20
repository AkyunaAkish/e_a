const retrievePost = require('../actions/retrievePost.js');

module.exports = (req, res) => {
    if (req.params.id && typeof Number(req.params.id) === 'number') {
        retrievePost(req.params.id)
            .then((post) => {
                if (post.success) {
                    res.json({
                        success: post.success
                    });
                } else {
                    res.json({
                        error: post.error || 'Post could not be retrieved.'
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
            error: 'Invalid ID'
        });
    }
};
