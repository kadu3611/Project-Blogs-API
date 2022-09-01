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
    console.log(decoded.data[0].email, 'email');
    // const user = await User.findOne({ where: { email: decoded.data[0].email } });
    // console.log(user, 'user');
    req.user = decoded.data[0].email;
    next();
    } catch (err) {
        return res.status(401).json({ message: 'Expired or invalid token' });
    }
};

module.exports = {
    tokenValid,
};