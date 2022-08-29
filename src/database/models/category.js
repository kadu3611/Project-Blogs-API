'use strict';
const Categories = (sequelize, DataTypes) => {
  const Categories = sequelize.define("Category", {
  id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true,},
  name: DataTypes.STRING,
  },
  {
    timestamps: false, 
    tableName: 'Categories',
  });

  // Users.associate = (models) => {
  //   Users.hasMany(models.User, { foreignKey: 'id', as: 'Users' });
  // };

  return Categories;
    };


module.exports = Categories;
