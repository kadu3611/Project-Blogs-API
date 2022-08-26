const jwt = require('jsonwebtoken');

const { JWT_SECRET } = process.env;

const tokenValid = async (req, res) => {
    const token = req.headers.authorization;
    if (!token) {
        res.status(401).json({ message: 'Token not found' });
    }
    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        return decoded;
    } catch (err) {
        return res.status(401).json({ message: 'Expired or invalid token' });
    }
};

module.exports = {
    tokenValid,
};