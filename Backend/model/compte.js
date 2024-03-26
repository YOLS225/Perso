const { Sequelize, Model } = require("sequelize");
const db = require("../db/db");
const Residence=require("../model/residence")

class Compte extends Model {}

Compte.init(
  {
    idcompte: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    montant: {
      type: Sequelize.STRING(45)
    },
    RESIDENCE_idresidence: {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: Residence,
        key: 'idresidence'
      }
    }
  },
  {
    sequelize:db,
    modelName: "Compte",
    tableName: "Compte",
    timestamps: false,
  }
);

module.exports = Compte;
