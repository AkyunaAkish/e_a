require('dotenv').config();
const bcrypt = require('bcrypt');

module.exports = (bodyPassword, userPassword) => {
    return new Promise((resolve, reject) => {
        if (bcrypt.compareSync(bodyPassword, userPassword)) {
            resolve({
                success: true
            });
        } else {
            reject({
                error: false
            });
        }
    });
};
