const { Category } = require('../models');

const validationCategory = async (req, res, next) => {
    const { categoryIds, content, title } = req.body;
    
    if (!categoryIds.length || !content.length || !title.length) {
        return res.status(400).json({ message: 'Some required fields are missing' });
    }
    next();
};

const verifyCategory = async (req, res, next) => {
    const { categoryIds } = req.body;
    console.log(typeof categoryIds[0]);
    const numOne = categoryIds;

    const arrayCategory = await Promise.all(categoryIds.map(async (element) => {
        const category = await Category.findAll({ where: { id: element },
        });
        console.log(category);
        return category;
        // if (!category) {
        //     return false;
        // }
        // return category;
    }));
console.log(arrayCategory);
    const category = await Category.findAll({ where: { id: numOne[0] },
    });
    console.log(category, 'categoryMinha');

    if (categoryIds.length < 1) {
    return res.status(400).json({ message: '"categoryIds" not found' }); 
}

next();
};

module.exports = {
    validationCategory,
    verifyCategory,
};