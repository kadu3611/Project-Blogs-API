'use strict';
const PostCategory = (sequelize, DataTypes) => {
  const PostCategory = sequelize.define("PostCategory", {
    categoryId: {type: DataTypes.INTEGER, foreignKey: true, 
        references: {
        model: 'BlogPosts',
        key: 'id',
      }, },
      postId: {type: DataTypes.INTEGER, foreignKey: true, 
        references: {
        model: 'Categories',
        key: 'id',
      }, }
  },
  {
    timestamps: false, 
  });

  PostCategory.associate = (models) => {
    models.Category.belongsToMany(models.BlogPost, { 
        as: 'blogPosts',
        through: PostCategory,
        foreignKey: 'categoryId',
        
    });
        models.BlogPost.belongsToMany(models.Category, { 
            as: 'categories',
            through: PostCategory,
            foreignKey: 'postId',
            
        });

  };

  return PostCategory;
    };


module.exports = PostCategory;
