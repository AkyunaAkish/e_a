const verifyPassword = require('../../users/actions/verifyPassword.js');
const verifyAdmin = require('../../users/actions/verifyAdmin.js');
const retrieveUser = require('../../users/actions/retrieveUser.js');
const insertPost = require('../actions/insertPost.js');

module.exports = (req, res) => {
    if (req.body.user &&
        typeof req.body.user === 'object' &&
        req.body.token &&
        typeof req.body.token === 'string' &&
        req.body.user.email &&
        typeof req.body.user.email === 'string' &&
        req.body.user.username &&
        typeof req.body.user.username === 'string' &&
        req.body.post.title &&
        typeof req.body.post.title === 'string' &&
        req.body.post.content &&
        typeof req.body.post.content === 'string' &&
        req.body.post.thumbnail_url &&
        typeof req.body.post.thumbnail_url === 'string' &&
        req.body.password &&
        typeof req.body.password === 'string') {
        retrieveUser(req.body.user.email)
            .then((user) => {
                if (user.success) {
                    verifyAdmin(req, res, user.success, req.body.token)
                        .then((verifyAdminRes) => {
                            if (verifyAdminRes.success) {
                                verifyPassword(req.body.password, user.success.password)
                                    .then((verifyPasswordRes) => {
                                        if (verifyPasswordRes.success) {
                                            insertPost(req, res)
                                                .then((insertRes) => {
                                                    if (insertRes.success) {
                                                        console.log('insert post then', insertRes);
                                                        res.json({
                                                            success: insertRes.success
                                                        });
                                                    } else {
                                                        res.json({
                                                            error: insertRes.error || 'An error occurred submitting your post, please try again.'
                                                        });
                                                    }
                                                })
                                                .catch((err) => {
                                                    console.log('insert post catch', err);
                                                    res.json({
                                                        error: 'Post failed to be submitted',
                                                        reason: err
                                                    });
                                                });
                                        } else {
                                            console.log('password err', verifyPasswordRes);
                                            res.json({
                                                error: 'Invalid Password',
                                                reason: verifyPasswordRes.error || null
                                            });
                                        }
                                    })
                                    .catch((err) => {
                                        console.log('password err', err);
                                        res.json({
                                            error: 'Invalid Password',
                                            reason: err || null
                                        });
                                    });
                            } else {
                                res.json({
                                    error: 'Not admin',
                                    reason: verifyAdminRes.error || null
                                });
                            }
                        })
                        .catch((err) => {
                            console.log('user success else', user);

                            res.json({
                                error: err
                            });
                        });
                } else {
                    console.log('user success else', user);
                    res.json({
                        error: 'Could not retrieve user for validation of session'
                    });
                }
            })
            .catch((err) => {
                console.log('retrieve user catch', err);
                res.json({
                    error: err
                });
            });
    } else {
        console.log('not enough data in submit post', req.body);
        res.json({
            error: 'An error occurred, please sign in.'
        });
    }
};
