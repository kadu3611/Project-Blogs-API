const jwt = require('jsonwebtoken');
const { User } = require('../models');

const { JWT_SECRET } = process.env;
// const { missingDate } = require('../database/middlwares/validationLogin');

const postLoginValidation = async (req, res) => {
    const { email, password } = req.body;
    const testUser = await User.findAll({
        where: { email },
    });
    const testPassword = await User.findAll({
        where: { password },
    });
    // const testUser = await Users.findOne({ where: { email } });
    // const testPassword = await Users.findOne({ where: { password } });
        if (!testUser.length || !testPassword.length) {
            return res.status(400).json({ message: 'Invalid fields' });
        }
        // const secret = 'tokenAqui';
        const jwtConfig = {
            expiresIn: '1d', algorithm: 'HS256',
        };

        const token = jwt.sign({ data: testUser }, JWT_SECRET, jwtConfig);
        return res.status(200).json({ token });
    };
module.exports = {
    postLoginValidation,
};