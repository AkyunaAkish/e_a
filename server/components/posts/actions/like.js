const knex = require('../../../db_config/knex');

module.exports = (req, res, user) => {
    return new Promise((resolve, reject) => {
        knex('likes')
            .insert({
                user_id: user.id,
                post_id: req.body.post.id,
                like_created_at: Date.now()
            })
            .then((insertRes) => {
                resolve({
                    success: insertRes
                });
            })
            .catch((err) => {
                reject({
                    error: err
                });
            });
    });
};
