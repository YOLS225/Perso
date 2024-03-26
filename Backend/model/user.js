const { Sequelize, Model } = require("sequelize");
const Role = require("./role");
const db = require("../db/db");

class User extends Model {}

User.init(
  {
    idusers: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    login: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    name: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    password: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    role: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    role_idrole: {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: Role,
        key: "idrole",
      }
    }
  },
  {sequelize:db,
    modelName: "User",
    tableName: "users",
    timestamps: false,
  }
);

//User.belongsTo(Role);

module.exports = User;
