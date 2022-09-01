'use strict';
const Categories = (sequelize, DataTypes) => {
  const Categories = sequelize.define("Category", {
  id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true,},
  name: DataTypes.STRING,
  },
  {
    timestamps: false, 
  });


  return Categories;
    };


module.exports = Categories;
