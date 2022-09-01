const { BlogPost, Category, User } = require('../models');

const getBlogPost = async (req, res) => {
    // const { auth } = req;

    // const [{ id }] = await User.findAll({ where: { email } });
    const result = await BlogPost.findAll({ include: [{
        model: User,
        as: 'user',
       attributes: { exclude: ['password'] },
    },
    {
        model: Category,
        as: 'categories',
        through: { attributes: [] },
    }],
    });
    console.log(result, 'result');
    return res.status(200).json(result);
};

const postCategory = async (req, res) => {
    const { categoryIds, content, title } = req.body;
    const categoryValid = Promise.all(categoryIds.map(async (element) => {
        const [user] = await BlogPost.findOrCreate({
            where: { id: element },
            defaults: {
                categoryIds,
                content,
                title,
                userId: element,
            },
        });
        return user.dataValues;
    }));
    return res.status(201).json(await categoryValid);
};

module.exports = {
    postCategory,
    getBlogPost,
};