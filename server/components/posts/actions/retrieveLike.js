const knex = require('../../../db_config/knex');

module.exports = (req, res, user) => {
    return new Promise((resolve, reject) => {
        knex('likes')
            .where({
                user_id: user.id,
                post_id: req.body.post.id
            })
            .first()
            .count()
            .then((like) => {
                resolve(like.count);
            })
            .catch((err) => {
                reject({
                    error: 'An error occurred when attempting to retrieve like.',
                    reason: err
                });
            });
    });
};
