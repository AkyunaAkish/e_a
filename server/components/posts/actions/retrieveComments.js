const knex = require('../../../db_config/knex');
const bcrypt = require('bcrypt');

module.exports = (req, res) => {
    return new Promise((resolve, reject) => {
        knex('comments')
            .where({
                post_id: req.params.id
            })
            .innerJoin('users', 'comments.user_id', 'users.id')
            .then((comments) => {
                let modifiedComments = comments.reduce((comments, comment) => {
                    delete comment.admin;
                    delete comment.password;
                    comments.push(comment);
                    return comments;
                }, []);

                resolve({
                    success: modifiedComments
                });
            })
            .catch((err) => {
                reject({
                    error: 'An error occurred when attempting to retrieve comments.',
                    reason: err
                });
            });
    });
};
