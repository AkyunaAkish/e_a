const comment = require('../actions/comment.js');
const retrieveUserFromSession = require('../../users/actions/retrieveUserFromSession.js');
const verifyToken = require('../../users/actions/verifyToken.js');

module.exports = (req, res) => {
    if (req.body.session &&
        typeof req.body.session === 'object' &&
        req.body.session.user &&
        typeof req.body.session.user === 'object' &&
        req.body.session.user.username &&
        typeof req.body.session.user.username === 'string' &&
        req.body.session.user.email &&
        typeof req.body.session.user.email === 'string' &&
        req.body.session.token &&
        typeof req.body.session.token === 'string' &&
        req.body.comment &&
        typeof req.body.comment === 'string' &&
        req.body.comment.length > 0 &&
        req.body.post &&
        typeof req.body.post === 'object' &&
        req.body.post.id) {
        retrieveUserFromSession(req, res)
            .then((userRes) => {
                if (!userRes || !userRes.success || !userRes.success.id) {
                    res.json({
                        error: userRes
                    });
                } else {
                    verifyToken(req, res, userRes.success, req.body.session.token)
                        .then((verifyRes) => {
                            if (verifyRes.success) {
                                comment(req, res, userRes.success)
                                    .then((commentRes) => {
                                        if (commentRes.success) {
                                            res.json({
                                                success: commentRes.success
                                            });
                                        } else {
                                            res.json({
                                                error: 'Could not comment, please confirm that you are signed in.',
                                                reason: commentRes
                                            });
                                        }
                                    })
                                    .catch((err) => {
                                        if (err.error) {
                                            res.json({
                                                error: err.error
                                            });
                                        } else {
                                            res.json({
                                                error: err
                                            });
                                        }
                                    });
                            } else {
                                res.json({
                                    error: 'Could not verify session, please sign in.',
                                    reason: verifyRes
                                });
                            }
                        })
                        .catch((err) => {
                            if (err.error) {
                                res.json({
                                    error: err.error
                                });
                            } else {
                                res.json({
                                    error: err
                                });
                            }
                        });
                }

            })
            .catch((err) => {
                if (err.error) {
                    res.json({
                        error: err.error
                    });
                } else {
                    res.json({
                        error: err
                    });
                }
            });
    } else {
        res.json({
            error: 'Insufficient data provided to submit a comment.'
        });
    }
};
