require('dotenv').config();
const jwt = require('jsonwebtoken');

module.exports = (req, res, user, token) => {
    return new Promise((resolve, reject) => {
        try {
            const decoded = jwt.verify(token, process.env.SECRET);

            if (Number(decoded.id) === Number(user.id) &&
                decoded.username === user.username &&
                decoded.email === user.email &&
                decoded.admin === user.admin &&
                decoded.created_at === user.created_at) {
                resolve({
                    success: token
                });
            } else {
                throw Error('Token doesn\'t match user.');
            }
        } catch (err) {
            reject({
                error: err.message
            });
        }
    });
};
