'use strict';

  module.exports = {
    up: async (queryInterface, Sequelize) => {
      const postCategorie = queryInterface.createTable("PostCategories", {
        postId: {
          type: Sequelize.INTEGER,
          foreignKey: true,
          onDelete: 'CASCADE',
          onUpdate: 'CASCADE',
          references: {
            model: 'BlogPosts',
            key: 'id',
          },
        },
        categoryId: {
          type: Sequelize.INTEGER,
          foreignKey: true,
          onDelete: 'CASCADE',
          onUpdate: 'CASCADE',
          references: {
            model: 'Categories',
            key: 'id',
          },
        }
      })
      return postCategorie;

  },

  down: async (queryInterface, Sequelize) => {
      queryInterface.dropTable("PostCategories")
  },
};
