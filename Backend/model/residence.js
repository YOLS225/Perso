const{Sequelize,Model}=require('sequelize');
const db = require('../db/db');
const Chambre = require('./chambre');

class Residence extends Model{}

Residence.init(
    {
      idresidence: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      name: {
        type: Sequelize.STRING(45)
      },
      adresse: {
        type: Sequelize.STRING(45)
      },
      contact: {
        type: Sequelize.STRING(45)
      },
      email: {
        type: Sequelize.STRING(45)
      },
      user_name: {
        type: Sequelize.STRING(45)
      }
      ,
      statut: {
        type: Sequelize.STRING(45),
        validate: {
          isIn: [['ACTIVE', 'INACTIVE']]
        }
      }
    },
    {
        sequelize:db,
        modelName:'residence',
        tableName:'residence',
        timestamps:false
    }
);

// Residence.hasMany(Chambre)


module.exports =Residence;