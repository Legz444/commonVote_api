require('dotenv').config();
const jwt = require('jsonwebtoken');
const SECRET = process.env.SECRET;
const crypto = require('crypto');

module.exports.auth = (req, res, next) => {
    const authHeader = req.headers.authorization;
    let token;
    if(authHeader) token = authHeader.split(' ')[1];
    if(token){
        jwt.verify(token, SECRET, (err, user) => {
            if(err){
                console.error(err)
                res.status(400).json(err)
                return;
            }else{
                req.user = user;
                next()
                return;
            }
        })
    }else{
        res.status(401)
        return;
    }
    res.status(403)
    
}

module.exports.hash = (password) => {
    return(
        crypto.createHmac('sha256', SECRET)
        .update(password)
        .digest('hex')
        .split('')
        .reverse()
        .join('')
    )
}