const knex = require('../../../db_config/knex');

module.exports = (req, res, user) => {
    return new Promise((resolve, reject) => {
        knex('likes')
            .where({
                user_id: user.id,
                post_id: req.body.post.id
            })
            .del()
            .then((delRes) => {
                resolve({
                    success: delRes
                });
            })
            .catch((err) => {
                reject({
                    error: err
                });
            });
    });
};
