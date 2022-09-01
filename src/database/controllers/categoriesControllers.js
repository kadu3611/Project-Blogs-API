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

const getCategory = async (_req, res) => {
    const getAll = await Category.findAll();
    return res.status(200).json(getAll);
};

module.exports = {
    postAddCategory,
    getCategory,
};

// bulkCreate => lança tudo no banco de dados