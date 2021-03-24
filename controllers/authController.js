require('dotenv').config();
const jwt = require('jsonwebtoken');
const SECRET = process.env.SECRET;
const crypto = require('crypto');

module.exports.hash = (password) => {
    return(
        crypto('sha256', SECRET)
        .update(password)
        .digest('hex')
        .split('')
        .reverse()
        .join('')
    )
}