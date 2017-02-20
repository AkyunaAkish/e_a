const retrieveLikes = require('../actions/retrieveLikes.js');

module.exports = (req, res) => {
    retrieveLikes(req, res)
        .then((likes) => {
            res.json({
                success: likes
            });
        })
        .catch((err) => {
            res.json({
                error: err
            });
        });
};
