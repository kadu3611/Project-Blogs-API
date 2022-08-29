'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const Category = queryInterface.createTable("Categories", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      name:{
        allowNull: false,
        type: Sequelize.STRING,
      },
    },
    {
      timestamps: false,
    }
    )
    return Category;
  },

  down: async (queryInterface, Sequelize) => queryInterface.dropTable("Categories"),
};