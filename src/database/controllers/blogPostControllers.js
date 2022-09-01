const { BlogPost, Category, User } = require('../models');

const getBlogPost = async (_req, res) => {
    // const BancoBlog = `blogs-api-dev.${BlogPost}`;
    const result = await BlogPost.findAll({
        include: [{
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
    return res.status(200).json(result);
};

const postCategory = async (req, res) => {
    const { categoryIds, content, title } = req.body;
    const { user } = req;
    console.log(user, 'user');
    // const user = await User.findAll({})
    const categoryValid = await Promise.all(categoryIds.map(async (element) => {
        const [novo] = await BlogPost.findOrCreate({
            where: { id: element },
            defaults: {
                content,
                title,
                userId: element,
            },
        });

        return novo;
    }));
    console.log(categoryValid, 'categoryValid');
    return res.status(201).json(categoryValid);
};

module.exports = {
    postCategory,
    getBlogPost,
};