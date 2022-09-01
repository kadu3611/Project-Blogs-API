const { Category } = require('../models');

const validationCategory = async (req, res, next) => {
    const { content, title } = req.body;
    
    if (!content.length || !title.length) {
        return res.status(400).json({ message: 'Some required fields are missing' });
    }
    next();
};

const verifyCategory = async (req, res, next) => {
    const { categoryIds } = req.body;
        await Promise.all(categoryIds.map(async (element) => {
        const category = await Category.findAll({ where: { id: element },
        });
        if (!category.length) {
            return res.status(400).json({ message: '"categoryIds" not found' }); 
        }

        return category;
    }));

next();
};

module.exports = {
    validationCategory,
    verifyCategory,
};