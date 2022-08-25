module.exports = {
  up: async (queryInterface, Sequelize) => {
    const blogPost = queryInterface.createTable("BlogPosts", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      title:{
        allowNull: false,
        type: Sequelize.STRING,
      },
      content:{
        allowNull: false,
        type: Sequelize.STRING,
      },
      userId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Users',
          key: 'id',
        },
        onDelete: 'CASCADE',
        primaryKey: true,
      },
      published:{  
        allowNull: false,
        type: Sequelize.DATE,
      },
      updated:{
        allowNull: false,
        type: Sequelize.DATE,
      },
    })
    return blogPost;
  },

  down: async (queryInterface, Sequelize) => queryInterface.dropTable("BlogPosts"),
};

