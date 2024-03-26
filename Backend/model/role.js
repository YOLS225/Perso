const { Sequelize, Model } = require("sequelize");
const db = require("../db/db");
const User = require("./user");

class Role extends Model {}

Role.init(
  {
    idrole: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    code: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    designation: {
      type: Sequelize.STRING,
      allowNull: false,
    }
  },
  {
    sequelize:db,
    modelName: "Role",
    tableName: "role",
    timestamps: false,
  }
);

Role.hasMany(User);

module.exports = Role;
