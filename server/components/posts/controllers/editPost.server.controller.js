require('dotenv').config();
const verifyPassword = require('../../users/actions/verifyPassword.js');
const verifyAdmin = require('../../users/actions/verifyAdmin.js');
const retrieveUser = require('../../users/actions/retrieveUser.js');
const editPost = require('../actions/editPost.js');

module.exports = (req, res) => {
    if (req.body.user &&
        typeof req.body.user === 'object' &&
        req.body.token &&
        typeof req.body.token === 'string' &&
        req.body.user.email &&
        typeof req.body.user.email === 'string' &&
        req.body.user.username &&
        typeof req.body.user.username === 'string' &&
        req.body.password &&
        typeof req.body.password === 'string' &&
        req.body.user.username === process.env.ADMIN &&
        req.body.post &&
        typeof req.body.post === 'object') {
        retrieveUser(req.body.user.email)
            .then((user) => {
                if (user.success) {
                    verifyAdmin(req, res, user.success, req.body.token)
                        .then((verifyAdminRes) => {
                            if (verifyAdminRes.success) {
                                verifyPassword(req.body.password, user.success.password)
                                    .then((verifyPasswordRes) => {
                                        if (verifyPasswordRes.success) {
                                            editPost(req, res)
                                                .then((editRes) => {
                                                    if (editRes.success) {
                                                        res.json({
                                                            success: editRes.success
                                                        });
                                                    } else {
                                                        res.json({
                                                            error: editRes.error || 'An error occurred editing your post, please try again.'
                                                        });
                                                    }
                                                })
                                                .catch((err) => {
                                                    res.json({
                                                        error: 'Post failed to be edited.',
                                                        reason: err
                                                    });
                                                });
                                        } else {
                                            res.json({
                                                error: 'Invalid Password.',
                                                reason: verifyPasswordRes.error || null
                                            });
                                        }
                                    })
                                    .catch((err) => {
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
                            res.json({
                                error: err
                            });
                        });
                } else {
                    res.json({
                        error: 'Could not retrieve user for validation of session.'
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
            error: 'An error occurred, please sign in.'
        });
    }
};