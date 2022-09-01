const jwt = require('jsonwebtoken');
const { User } = require('../models');

const { JWT_SECRET } = process.env;
// const { missingDate } = require('../database/middlwares/validationLogin');

const postLoginValidation = async (req, res) => {
    // const { email, password } = req.body;
    const { body } = req;
    const testUser = await User.findAll({
        where: body,
    });
        if (!testUser.length) {
            return res.status(400).json({ message: 'Invalid fields' });
        }
        const jwtConfig = {
            expiresIn: '1d', algorithm: 'HS256',
        };

        const token = jwt.sign({ data: body.email }, JWT_SECRET, jwtConfig);
        return res.status(200).json({ token });
    };
module.exports = {
    postLoginValidation,
};