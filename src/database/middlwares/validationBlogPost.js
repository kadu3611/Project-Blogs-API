const { BlogPost } = require('../models');

const blogPostValid = async (req, res, next) => {
    const { id } = req.params;
    const resultDateId = await BlogPost.findOne({ where: { id } });
    if (!resultDateId) {
        return res.send(404).json({
            message: 'Post does not exist',
        });
    }
    next();
};

module.exports = {
    blogPostValid,
};