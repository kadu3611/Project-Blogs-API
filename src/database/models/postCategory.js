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
        as: 'BlogPosts',
        through: PostCategory,
        foreignKey: 'categoryId',
         otherKey: 'id',
        
    });
        models.BlogPost.belongsToMany(models.Category, { 
            as: 'Categories',
            through: PostCategory,
            foreignKey: 'postId',
             otherKey: 'id',
            
        });

  };

  return PostCategory;
    };


module.exports = PostCategory;
