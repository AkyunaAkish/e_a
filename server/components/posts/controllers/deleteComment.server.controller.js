const retrieveUserFromSession = require('../../users/actions/retrieveUserFromSession.js');
const verifyToken = require('../../users/actions/verifyToken.js');
const verifyAdmin = require('../../users/actions/verifyAdmin.js');
const deleteComment = require('../actions/deleteComment.js');

module.exports = (req, res) => {
    let hasValidData = !!(req.body.session.user &&
        typeof req.body.session.user === 'object' &&
        req.body.session.token &&
        typeof req.body.session.token === 'string' &&
        req.body.session.user.email &&
        typeof req.body.session.user.email === 'string' &&
        req.body.session.user.username &&
        typeof req.body.session.user.username === 'string' &&
        req.body.comment &&
        typeof req.body.comment === 'object');

    if (hasValidData) {
        retrieveUserFromSession(req, res)
            .then((user) => {
                if (user.success && req.body.admin) {
                    verifyAdmin(req, res, user.success, req.body.session.token)
                        .then((verifyAdminRes) => {
                            if (verifyAdminRes.success) {
                                deleteComment(req, res, user.success)
                                    .then((deleteRes) => {
                                        if (deleteRes.success) {
                                            res.json({
                                                success: deleteRes.success
                                            });
                                        } else {
                                            res.json({
                                                error: 'Delete comment error',
                                                reason: deleteRes
                                            });
                                        }
                                    })
                                    .catch((err) => {
                                        res.json({
                                            error: 'Delete comment error',
                                            reason: err
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
                } else if (user.success && !req.body.admin) {
                    deleteComment(req, res, user.success)
                        .then((deleteRes) => {
                            if (deleteRes.success) {
                                res.json({
                                    success: deleteRes.success
                                });
                            } else {
                                res.json({
                                    error: 'Delete comment error',
                                    reason: deleteRes
                                });
                            }
                        })
                        .catch((err) => {
                            res.json({
                                error: 'Delete comment error',
                                reason: err
                            });
                        });
                } else {
                    res.json({
                        error: 'Delete comment error',
                        reason: user
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
