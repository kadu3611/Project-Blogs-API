const jwt = require('jsonwebtoken');
const { User } = require('../models');
// const { missingDate } = require('../database/middlwares/validationLogin');
const { JWT_SECRET } = process.env;

const postUserValidation = async (req, res) => {
    const { email, password, displayName, image } = req.body;
    console.log(JWT_SECRET, 'jwt');

    const [user, created] = await User.findOrCreate({
    where: { email },
    defaults: { displayName, email, password, image },
  });
    
    if (!created) {
        return res.status(409).json({ message: 'User already registered' });
    }
    const jwtConfig = {
        expiresIn: '1d', algorithm: 'HS256',
    };

    const token = jwt.sign({ data: user.email }, JWT_SECRET, jwtConfig);
    return res.status(201).json({ token });
};

module.exports = {
    postUserValidation,
};
