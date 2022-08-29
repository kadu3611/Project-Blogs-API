const jwt = require('jsonwebtoken');
const { User } = require('../models');
// const { missingDate } = require('../database/middlwares/validationLogin');
const { JWT_SECRET } = process.env;

const postUserValidation = async (req, res) => {
    const { email, password, displayName, image } = req.body;

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

const getAllUsers = async (_req, res) => {
    const allUser = await User.findAll({ attributes: ['id',
     'displayName', 'email', 'image'] });
    return res.status(200).json(allUser);
};

const getIdUsers = async (req, res) => {
    const { params } = req;
    const { id } = params;
    const searchId = await User.findAll({ where: { id },
         attributes: { exclude: ['password'] } }); 
         console.log(searchId, 'searchId');
    if (!searchId.length) {
        return res.status(404).json({ message: 'User does not exist' });
    }
    return res.status(200).json(searchId[0]);
};

module.exports = {
    postUserValidation,
    getAllUsers,
    getIdUsers,
};
