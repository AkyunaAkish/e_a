const retrieveUser = require('../actions/retrieveUser.js');

module.exports = (req, res) => {
    console.log('test',  req.body);
    if (req.body.email &&
        typeof req.body.email === 'string' &&
        req.body.securityAnswerOne &&
        typeof req.body.securityAnswerOne === 'string' && 
        req.body.securityAnswerTwo &&
        typeof req.body.securityAnswerTwo === 'string') {
        retrieveUser(req.body.email)
            .then((user) => {
                if (user && 
                    user.success && 
                    user.success.security_answer_one.toLowerCase().trim() == req.body.securityAnswerOne.toLowerCase().trim() && 
                    user.success.security_answer_two.toLowerCase().trim() == req.body.securityAnswerTwo.toLowerCase().trim()) {
                    res.json({
                        success: 'security answers valid'
                    });
                } else {
                    res.json({
                        error: 'User not found or security answers invalid.'
                    });
                }
            })
            .catch((err) => {
                res.json({
                    error: 'An error occurred.',
                    reason: err
                });
            });
    } else {
        res.json({
            error: 'An error occurred.'
        });
    }
};