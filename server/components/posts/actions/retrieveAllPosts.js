const knex = require('../../../db_config/knex');
const _ = require('lodash');

module.exports = (req, res) => {
    return new Promise((resolve, reject) => {
        knex('posts')
            .then((posts) => {
                let postIDArr = _.map(posts, (post, i) => {
                    return post.id;
                });

                knex('likes')
                    .whereIn('post_id', postIDArr)
                    .then((likeRes) => {
                        let bundledPosts = _.map(posts, (post) => {
                            post.likes = 0;

                            _.each(likeRes, (like) => {
                                if (like.post_id === post.id) {
                                    post.likes += 1;
                                }
                            });

                            return post;
                        });

                        resolve({
                            success: bundledPosts
                        });
                    })
                    .catch((err) => {
                        reject({
                            error: 'An error occurred when attempting to retrieve the likes of posts.',
                            reason: err
                        });
                    });
            })
            .catch((err) => {
                reject({
                    error: 'An error occurred when attempting to retrieve posts.',
                    reason: err
                });
            });
    });
};
