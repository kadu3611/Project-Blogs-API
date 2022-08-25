'use strict';
const Users = (sequelize, DataTypes) => {
  const Users = sequelize.define("User", {
  id: {type: DataTypes.INTEGER, primaryKey: true},
  displayName: DataTypes.STRING,
  email: DataTypes.STRING,
  password: DataTypes.STRING,
  image: DataTypes.STRING,
  },
  {
    timestamps: false,
  });

  Users.associate = (models) => {
    Users.hasMany(models.User, { foreignKey: 'id', as: 'Users' });
  };

  return Users;
    };


module.exports = Users;
