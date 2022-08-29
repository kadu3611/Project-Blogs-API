const { Category } = require('../models');

const postAddCategory = async (req, res) => {
    try {
    const { name } = req.body;
    const [user] = await Category.findOrCreate({
        where: { name },
        defaults: { name },
      });

return res.status(201).json(user.dataValues);
} catch (err) {
    return res.status(400).json({ message: '"name" is required' });
}
};

module.exports = {
    postAddCategory,
};