require('dotenv').config();
const jwt = require('jsonwebtoken');

module.exports = (req, res, user, token) => {
    return new Promise((resolve, reject) => {
        try {
            const decoded = jwt.verify(token, process.env.SECRET);
            if (Number(decoded.id) === Number(user.id) && user.username == process.env.ADMIN) {
                resolve({
                    success: token
                });
            } else {
                throw Error('Token doesn\'t match user or user is not admin.');
            }
        } catch (err) {
            reject({
                error: err.message
            });
        }
    });
};
