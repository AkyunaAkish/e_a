const like = require('../actions/like.js');
const unlike = require('../actions/unlike.js');
const retrieveLike = require('../actions/retrieveLike.js');
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
                                retrieveLike(req, res, userRes.success)
                                    .then((retrieveLikeRes) => {
                                        if (retrieveLikeRes < 1) {
                                            like(req, res, userRes.success)
                                                .then((likeRes) => {
                                                    res.json({
                                                        success: likeRes
                                                    });
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
                                            unlike(req, res, userRes.success)
                                                .then((unlikeRes) => {
                                                    res.json({
                                                        success: unlikeRes
                                                    });
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
