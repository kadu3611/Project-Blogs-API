const jwt = require('jsonwebtoken');
// const { User } = require('../models/user');

const { JWT_SECRET } = process.env;

const tokenValid = async (req, res, next) => {
    try {
    const { headers } = req;
    const { authorization } = headers;
    
    if (!authorization) {
        return res.status(401).json({ message: 'Token not found' });
    }
    const decoded = jwt.verify(authorization, JWT_SECRET);
    req.auth = decoded.data;
    next();
    } catch (err) {
        return res.status(401).json({ message: 'Expired or invalid token' });
    }
};

module.exports = {
    tokenValid,
};