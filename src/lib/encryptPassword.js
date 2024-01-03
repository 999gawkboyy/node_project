const crypto = require('crypto')
module.exports = function encryptPassword(password) {
    return crypto
        .createHash('sha256')
        .update(password + "ssibal")
        .digest('base64')
}