const { Sequelize, Model } = require("sequelize");
const db = require("../db/db");
const Reservation = require("./reservation");

class Client extends Model {}

Client.init(
  {
    idclient: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },

    nom: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    prenom: {
      type: Sequelize.STRING,
      allowNull: false,
    },num_piece: {
      type: Sequelize.STRING,
      allowNull: false,
    },nom: {
      type_piece: Sequelize.STRING,
      allowNull: false,
    },nom: {
      type: Sequelize.STRING,
      allowNull: false,
    },contact: {
      type: Sequelize.STRING,
      allowNull: false,
    },user_name: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    nom: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    statut: {
      type: Sequelize.STRING(45),
      validate: {
        isIn: [['ACTIF', 'INACTIF']]
      }
    }
  },
  {
    sequelize:db,
    modelName: "client",
    tableName: "client",
    timestamps: false,
  }
);

 Client.hasMany(Reservation)

module.exports = Client;
